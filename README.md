# Práctica Angular - Ingeniería Web 2021/1

## Servicio de owner

Este servicio contiene toda la lógica para realizar las peticiones HTTP al recurso https://thawing-chamber-47973.herokuapp.com/owners. En este servicio encontramos las siguientes funciones:

- getAll: Esta función nos permite hacer una petición get al recurso anteriormente mencionado.
- get: Esta función hace una petición HTTP al recurso https://thawing-chamber-47973.herokuapp.com/owners/search/findByDni?dni= para obtener los owners que tengan el dni indicado en la ruta.
- save: Esta función contiene la lógica para la creación y/o actualización de un owner, dentro de esta función se determina si que petición HTTP(POST O PUT) debe realizar a través de la propiedad href de cada owner. En caso de que el href exista, esto significa que el owner ha sido creado y la acción que se desea realizar es la de update al hacer una petición al recurso https://thawing-chamber-47973.herokuapp.com/owners/{ownerDni}, en caso contrario se deberá hacer una petición post al recurso https://thawing-chamber-47973.herokuapp.com/owners.
- remove: Esta función es la encargada de realizar una petición delete mediante el href del registro de owner.

## Componente de owner-list

En este componente se desarrollo toda la lógica para renderizar en la pantalla toda información de los owners registrados en la aplicación. Para lograr esto se consumieron las función de getAll expuesta por el servicio anteriormente explicado, esto con el uso de los métodos del ciclo de vida de un componente que ofrece Angular, en esta caso el método _ngOnInit_, con la respuesta obtenida, se hace un pequeño filtro mediante la función de JavaScript filter, esto con el fn de filtrar los owners que hayan sido creados(por otros compañeros) con dni's random que puedan ocasionar errores en el componente. Finalmente, se renderiza la información en forma de lista con la ayuda de la directiva de Angular ngFor y los componentes de Angular Material.

## Componente de owner-edit

En este componente tendremos el formulario para crear o actualizar un owner, esto dependiendo de si existe obtenemos un parametro(dni) a través de la ruta del componente. En el caso que no se obtenga un dni del owner, se renderizara el formulario para crear un nuevo owner, por otra parte, en caso de que obtengamos el dni mediante el parametro de la ruta se hara un petición al backend mediante la función get del servicio de owner para obtener un owner mediante su dni, cuando tengamos la información de este owner la renderizamos en el formulario y se podra actualizar dicho owner. Finalmente en caso de que se obtenga un owner mediante la petición al backend, le daremos la opción al usuario de eliminar este owner a través del método de remove del servicio anteriormente mencionado.

## Componente de car-edit

En este componente se agrego en el formulario un nuevo campo select de html para asociar un owner al car a editar, este select debe ser "llenado" de forma dinamica para dar la opción al usuario de escoger un owner que haya sido registrado en la aplicación, esto fue posible a través de la utilización del método getAll del servicio de owner para obtener todos los owners en el backend y poderlos renderizar en dicho select.

## Componente de car-card

Este componente se creo con la finalidad de renderizar la información del owner de cada uno de los vehiculos, esto a través de hacer un petición en el ngOninit con la información del ownerDni que contiene cada car, esto último mediante el uso de una petición HTTP con el servicio de owner.
