import { ChatCompletionRequestMessageRoleEnum, Configuration, CreateImageRequest, CreateImageRequestResponseFormatEnum, CreateImageRequestSizeEnum, OpenAIApi  } from 'openai';
import { TextModel, TextModelEnum } from '../models/enums';


export class OpenAiUtils {
    static async getCompletion(model: TextModelEnum,prompt: string,temperature: number = 0.6): Promise<any> {
        const configuration = new Configuration({
            apiKey: process.env.OPENAI_API_KEY,
        });
        if (!process.env.OPENAI_API_KEY) {
            throw new Error('OPENAI_API_KEY is not set');
        }
        const openai = new OpenAIApi(configuration);
        let m = TextModel[model];
        const completion = await openai.createCompletion({
            model:m,
            prompt: prompt,
            temperature: temperature,
            max_tokens: 200,
            stream:false
        });
        return completion;
    }

    static async chatGptCompletion(prompt: string,temperature: number = 0.6): Promise<any> {
        const configuration = new Configuration({
            apiKey: process.env.OPENAI_API_KEY,
        });
        if (!process.env.OPENAI_API_KEY) {
            throw new Error('OPENAI_API_KEY is not set');
        }
        const openai = new OpenAIApi(configuration);

        let m = TextModel[5];

        const completion = await openai.createChatCompletion({
            model:m,
            messages: [{
                "role":ChatCompletionRequestMessageRoleEnum.User,
                "content":prompt
            }],
            temperature: temperature,
            max_tokens: 200,
        });
        return completion;
    }
    static async getOneImage(prompt: string,size: CreateImageRequestSizeEnum ): Promise<any> {
        const configuration = new Configuration({
            apiKey: process.env.OPENAI_API_KEY,
        });
        if (!process.env.OPENAI_API_KEY) {
            throw new Error('OPENAI_API_KEY is not set');
        }
        const openai = new OpenAIApi(configuration);
        // let m = TextModel[3];
        let opts:CreateImageRequest = {
            n:1,
            prompt: prompt,
            size: size,
            response_format: CreateImageRequestResponseFormatEnum.B64Json
        }
        const response = await openai.createImage(opts);
        return response;
    }
}