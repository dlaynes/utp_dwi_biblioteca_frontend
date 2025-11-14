import { Routes } from '@angular/router';
import { Categoria } from './pages/public/categoria/categoria';
import { Registro } from './pages/public/registro/registro';
import { MisReservas } from './pages/public/mis-reservas/mis-reservas';
import { AcercaDe } from './pages/public/acerca-de/acerca-de';
import { Catalogo } from './pages/public/catalogo/catalogo';
import { Colecciones } from './pages/public/colecciones/colecciones';
import { Contacto } from './pages/public/contacto/contacto';
import { Index as AdminIndex } from './pages/admin/index/index';
import { Index as BibliotecarioIndex } from './pages/bibliotecario/index/index';
import { IndexPage } from './pages/public/index-page/index-page';
import { LoginPage } from './pages/public/login-page/login-page';
import { NotFoundPage } from './pages/public/not-found-page/not-found-page';
 
export const routes: Routes = [
    {
        path: '',
        component: IndexPage,
        title: 'Inicio'
    },
    {
        path: 'categoria/:slug',
        component: Categoria,
        title: 'Libros por categoría'
    },
    {
        path: 'login',
        component: LoginPage,
        title: 'Iniciar sesión'
    },
    {
        path: 'registro',
        component: Registro,
        title: 'Crear una cuenta'
    },{
        path: 'mis-reservas',
        component: MisReservas,
        title: 'Reservas realizadas'
    },{
        path: 'acerca-de',
        component: AcercaDe,
        title: 'Acerca de la Biblioteca'
    },{
        path: 'catalogo',
        component: Catalogo,
        title: 'Catálogo',
    }, {
        path: 'colecciones',
        component: Colecciones,
        title: 'Colecciones',
    }, {
        path: 'contacto',
        component: Contacto,
        title: 'Contáctanos',
    }, {
        path: 'admin',
        component: AdminIndex,
        title: 'Dashboard',
    }, {
        path: 'bibliotecario',
        component: BibliotecarioIndex,
        title: 'Dashboard',
    }, {
        path: '*',
        component: NotFoundPage,
        title: 'Página no encontrada'
    }

];
