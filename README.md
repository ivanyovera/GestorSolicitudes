# Gestor de Solicitudes - Angular 12

Este proyecto es un sistema de gestión de solicitudes. Se desarrolla con **Angular 12**, haciendo uso de Módulos. Permite listar, filtrar, ordenar y actualizar el estado de diversas solicitudes (mock) de manera reactiva y eficiente.


PREGUNTAS Y RESPUESTAS.

1.	¿Qué estructura utilizaste y por qué?

Se utilizó la estructura detallada a continuación, con la finalidad de mantener una legibilidad sencilla pero útil y preparada para escalar el proyecto. Se intenta seguir un patrón Core-Features-Shared. La idea principal es establecer un apartado Shared donde almacenan los elementos que serán usados por los componetes y/o servicios del proyectos de manera repetida. En el apartado Features se desarrolla cada uno de los módulos de la aplicación, en este caso es solo uno (solicitudes) pero de esta manera se asegura que se puedan agregar mas modulos y administrarlos junto a routing al momento de escalar la aplicación. Por último, ya que es un prototipo sencillo, no se agregó la carpeta Core, donde se debería implementar los elementos como guards y auths.

```text
src/app/
├── shared/              # Componentes y módulos reutilizables
│   └── components/
│       └── loading/     # Spinner de carga global
├── features/            # Módulos de funcionalidades de negocio
│   └── solicitudes/
│       ├── components/  # Componentes internos (Tabla)
│       ├── mocks/       # Datos de prueba (100 registros)
│       ├── models/      # Interfaces y tipos (Solicitud, Estado)
│       └── services/    # Lógica de datos reactiva
└── app.module.ts        # Módulo raíz configurado con animaciones y Material
```


2.	¿Cómo escalarías esta solución?

Lo principal sería establecer una conexión con una aplicación backend para poder implementar LazyLoading en la carga de datos (paginator). Además, si se necesitan mas módulos, se debería gestionar el LazyLoading de cada uno de estos con routing. Por otro lado, establecería junto al equipo de desarrollo el patrón de diseño a seguir para la implementación de los nuevos módulos. Lo sería mantener la simplicidad y eficacia que tiene el proyecto gestionar los datos reduciendo el tiempo de carga y renderización. Claramente, mantener las buenas prácticas de desarrollo, así como también sumar las medidas de seguridad necesarias como interceptores y uso de tokens y environments.

Algunas funciones que podrían sumarse también sería la capacidad de eliminar solicitudes llevando un registro de estas en caso de ser necesarias su reutilización. Pero esto dependería de los requerimientos realizados por el cliente, ya que este establece qué otras funciones desea.


3.	¿Qué mejorarías con más tiempo?

Con mas tiempo habria implementado funciones de seguridad, uso de guards, auths, tokens. Gestionaría la sesión del usuario ya que pueden ser varias personas las que administran las solicitudes y estaría bien bien llevar un registro de los cambios realizados por cada persona. Mejoras en la interfaz, hacerla la UX mas agradable para el usuario, no solo una página. En caso de ser requerido implemntar también las nuevas tecnologías de Angular en sus versiones mas recientes 


4.	Describe un problema que enfrentaste y cómo lo resolviste

Ya que utilicé la versión 12 de Angular, tuve problemas al momento de utilizar algunas funciones Angular Material pues era necesario tomar en consideración algunas incompatibilidades al momento de compilar. Investigué a profundidad sobre los cambios que eran necesarios y pude implementarlos y de esta manera correr bien la aplicación. También fue un poco complicado gestionar la lógica para los estilos que tendría la columna de Estado, pues quise hacer uso de un badge que fuera cambiando de colores según el estado y quería mantener la lógica en el archivo typescript en lugar de mantenerlo en el HTML, pero la experiencia que he tenido, junto a investición me ayudó a resolver esto, manteniendo este apartado bien estructurado para recibir cambios (nuevos estados) sin alterar el HTML.


INSTALACIÓN Y EJECUCIÓN

Debido a que este proyecto utiliza Angular 12, se utilizar **Node.js v14**.

1. **Instalar dependencias**:
   ```bash
   npm install
   ```

2. **Compilar para compatibilidad (NGCC)**:
   Angular 12 requiere procesar las librerías para el motor Ivy:
   ```bash
   npx ngcc --properties es2015 browser module main --first-only --create-ivy-entry-points
   ```

3. **Ejecutar el servidor de desarrollo**:
   ```bash
   npm start
   ```
   Navega a `http://localhost:4200/`.
