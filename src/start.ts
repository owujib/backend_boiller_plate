import Kernel from './kernel';
import Logger from './services/Logger';
const app = new Kernel({}).app;

const PORT = app.get('PORT') || 5000;

app.listen(PORT, () => {
  Logger.info(`server is running on PORT localhost:${PORT}`);
});
