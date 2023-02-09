import 'reflect-metadata';
import { createExpressServer } from 'routing-controllers';
import { TextGenController } from './controllers/textgen';
import { ImgGenController } from './controllers/imagegen';
const dotenv = require('dotenv');
dotenv.config();

const app = createExpressServer({
    controllers: [TextGenController, ImgGenController], // we specify controllers we want to use
});
const port = 3000;

app.get('/', (req:any, res:any) => {
    console.log(req)
    res.send('Hello Worldsss!');
});

app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});