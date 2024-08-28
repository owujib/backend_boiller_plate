import controllerTemplate from './controller';

export default function (
  type: 'controller' | 'route' | 'provider',
  name: string,
) {
  switch (type) {
    case 'controller':
      return controllerTemplate(name);
    // case 'route':
    // case 'provider':
    default:
      throw 'no template';
  }
}
