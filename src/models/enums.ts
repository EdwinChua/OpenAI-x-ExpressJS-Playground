import { CreateImageRequestSizeEnum } from 'openai';
export const TextModel = {
    0: "text-ada-001",
    1: "text-babbage-001",
    2: "text-curie-001",
    3: "text-davinci-002",
    4: "text-davinci-003",
    5: "gpt-3.5-turbo"
}

export type TextModelEnum = 0 | 1 | 2 | 3 | 4;


export const SizeModel = {
    0: CreateImageRequestSizeEnum._256x256,
    1: CreateImageRequestSizeEnum._512x512,
    2: CreateImageRequestSizeEnum._1024x1024,
}

export type SizeModelEnum = 0 | 1 | 2;