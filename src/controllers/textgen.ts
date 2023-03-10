import { Controller, Param, Get, } from 'routing-controllers';
import { OpenAiUtils } from '../utils/openai-utils';
import { TextModelEnum } from '../models/enums';

@Controller("/textgen")
export class TextGenController {
    @Get('/:model/:prompt')
    async getCompletion(@Param('model') model: TextModelEnum, @Param('prompt') prompt: string) {
        try {
            let completion = await OpenAiUtils.getCompletion(model,prompt);
            // return completion.data.choices[0].text;
            let res = `
            <p>Your prompt</p>
            <p>${prompt}</p>
            <p>Response:</p>
                <p>${completion.data.choices[0].text}</p>
            `;
    
            return res;
        } catch (ex){
            console.log(ex)
            return null
        }
        

    }

    @Get('/chat/:model/:prompt')
    async chatCompletion(@Param('model') model: TextModelEnum, @Param('prompt') prompt: string) {
        
        
        let completion = await OpenAiUtils.chatGptCompletion(prompt);
        console.log(model)
        completion.data.choices.forEach((c:any)=>{
            console.log(c.message)
        })
        // return completion.data.choices[0].text;
        let res = `
        <p>Your prompt</p>
        <p>${prompt}</p>
        <p>Response:</p>
            <p>${completion.data.choices[0].text}</p>
        `;

        return res;
    }
}