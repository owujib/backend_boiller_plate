import Kernel from './kernel';
import Logger from './services/Logger';
const app = new Kernel().app
const PORT = app.get('PORT');

app.listen(PORT, () => {
  Logger.info(`server is runing on PORT localhost:${PORT}`);
});
