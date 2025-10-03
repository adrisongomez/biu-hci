# Arquitectura de Autenticación

Este documento detalla el flujo de autenticación de la aplicación, que se gestiona mediante una combinación de React, Redux, Expo Router y Supabase.

## Resumen del Flujo

El sistema de autenticación está diseñado para ser centralizado y reactivo. Un componente principal `Auth` actúa como un proveedor que envuelve toda la aplicación. Este componente escucha los eventos de autenticación de Supabase, actualiza un store de Redux y gestiona las redirecciones de rutas, asegurando que el usuario vea la pantalla correcta según su estado de autenticación.

## Componentes Clave

### 1. `src/superbase/client.ts`

Aquí se inicializa el cliente de Supabase. Es la configuración fundamental que permite a la aplicación comunicarse con los servicios de Supabase, incluida la autenticación. Se configura para usar `AsyncStorage` para la persistencia de la sesión en el dispositivo.

### 2. `src/redux/auth/`

Esta carpeta contiene toda la lógica de Redux para la autenticación.

-   **`reducer.ts`**: Define la forma del estado de autenticación (`AuthState`), que incluye:
    -   `status`: Un string que puede ser `'signed'`, `'logout'` o `'loading'`.
    -   `user`: El objeto de usuario de Supabase si está autenticado.
-   **`actions.ts`**: Define las acciones que se pueden despachar para modificar el estado de autenticación. La acción principal es `AuthAction_SetState`.

### 3. `src/usecases/auth/LoginForm/`

Esta carpeta contiene la interfaz de usuario y la lógica para el formulario de inicio de sesión.

-   **`index.tsx`**: Es el componente de React que renderiza los campos de email/contraseña y los botones. Utiliza el hook `useLoginForm` para manejar la lógica. La UI reacciona al estado de Redux (`loading`, `error`) para deshabilitar campos o mostrar mensajes.
-   **`hooks.ts`**: El hook `useLoginForm` utiliza `Formik` para gestionar el estado del formulario.
    -   Al enviar el formulario (`onSubmit`), primero despacha una acción a Redux para poner el estado en `loading`.
    -   Llama a `supabase.auth.signInWithPassword` con las credenciales.
    -   Si hay un error, actualiza el estado de Redux a `logout` y establece un mensaje de error local que se muestra en la UI.
    -   Si el inicio de sesión es exitoso, no hace nada más. La redirección es manejada por el componente `Auth`.

### 4. `src/usecases/auth/Auth/index.tsx`

Este es el componente más importante del flujo. Se renderiza en `app/_layout.tsx` y envuelve todas las rutas de la aplicación.

-   **Sincronización con Redux**: Utiliza un `useEffect` para suscribirse a los eventos de `onAuthStateChange` de Supabase.
    -   Cuando recibe eventos como `SIGNED_IN`, `INITIAL_SESSION` o `USER_UPDATED`, despacha una acción para actualizar el estado de Redux a `{ status: 'signed' }` con los datos del usuario.
    -   Cuando recibe `SIGNED_OUT`, actualiza el estado a `{ status: 'logout' }`.
    -   También comprueba la sesión activa al montarse por primera vez con `getSession`.
-   **Lógica de Redirección**: Utiliza un segundo `useEffect` que se ejecuta cada vez que el `status` de autenticación en Redux o la ruta (`pathname`) cambian.
    -   Si el usuario está autenticado (`status === 'signed'`) y se encuentra en la pantalla de login (`/`), lo redirige al `/dashboard`.
    -   Si el usuario no está autenticado (`status !== 'signed'`) y no está en la pantalla de login, lo redirige a `/`.
    -   Ignora cualquier redirección mientras el estado sea `loading` para evitar condiciones de carrera.

## Flujo de Inicio de Sesión (Paso a Paso)

1.  El usuario abre la app y ve el `LoginForm` en la ruta `/`.
2.  El usuario introduce sus credenciales y pulsa "Iniciar Sesión".
3.  El hook `useLoginForm` despacha la acción `{ status: 'loading' }`. La UI se actualiza para mostrar un indicador de carga.
4.  El hook llama a `supabase.auth.signInWithPassword`.
5.  Supabase procesa la solicitud.
    -   **En caso de éxito**: El listener `onAuthStateChange` en el componente `Auth` recibe el evento `SIGNED_IN`.
    -   **En caso de error**: El hook `useLoginForm` captura el error, despacha `{ status: 'logout' }` y muestra un mensaje de error en la UI.
6.  Tras un `SIGNED_IN`, el componente `Auth` despacha la acción `{ status: 'signed', user: ... }` a Redux.
7.  El estado de Redux se actualiza.
8.  El `useEffect` de redirección en `Auth` se activa por el cambio de estado. Ve que `status` es `'signed'` y que el `pathname` es `/`, por lo que ejecuta `router.replace('/dashboard')`.
9.  El usuario es redirigido al dashboard.

## Persistencia de Sesión

1.  Si un usuario que ya ha iniciado sesión cierra y vuelve a abrir la aplicación.
2.  El componente `Auth` se monta.
3.  Su `useEffect` llama a `supabase.auth.getSession()`.
4.  Supabase (usando `AsyncStorage`) encuentra la sesión guardada.
5.  El `useEffect` despacha la acción `{ status: 'signed', user: ... }`.
6.  El `useEffect` de redirección se activa y, como el usuario está en la ruta inicial (`/`) pero ya está autenticado, lo redirige inmediatamente al `/dashboard`.
