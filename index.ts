import Kernel from './kernel';
import Logger from './services/Logger';

const PORT = Kernel.get('PORT');

Kernel.listen(Kernel.get('PORT'), () => {
  Logger.info(`server is runing on PORT localhost:${PORT}`);
});
