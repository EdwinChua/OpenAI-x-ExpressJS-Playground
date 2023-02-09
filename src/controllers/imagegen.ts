import { Controller, Param, Get, } from 'routing-controllers';
import { OpenAiUtils } from '../utils/openai-utils';
import { SizeModelEnum } from '../models/enums';
import { CreateImageRequestSizeEnum } from 'openai';

@Controller("/imggen")
export class ImgGenController {


    @Get('/:sizeopt/:prompt')
    async getCompletion(@Param('sizeopt') model: SizeModelEnum, @Param('prompt') prompt: string) {
        let size: CreateImageRequestSizeEnum;
        switch (model) {
            case 0:
                size = CreateImageRequestSizeEnum._256x256;
                break;
            case 1:
                size = CreateImageRequestSizeEnum._512x512;
                break;
            case 2:
                size = CreateImageRequestSizeEnum._1024x1024;
                break;
            default:
                size = CreateImageRequestSizeEnum._256x256;
                break;
        }
        
        let response = await OpenAiUtils.getOneImage(prompt,size);
        // return completion.data.choices[0].text;
        // put response.data.data[0].url as an img src
        let res = `<img src="data:image/png;base64,${response.data.data[0].b64_json}" />`;
        return res;
    }

}