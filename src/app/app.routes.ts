import { Routes } from '@angular/router';

import { IndexPage } from './pages/public/index-page/index-page';
import { LoginPage } from './pages/public/login-page/login-page';
import { NotFoundPage } from './pages/public/not-found-page/not-found-page';
import { RegistroPage } from './pages/public/registro-page/registro-page';
import { MisReservasPage } from './pages/cliente/mis-reservas-page/mis-reservas-page';
import { DashboardBibliotecarioPage } from './pages/bibliotecario/dashboard-bibliotecario-page/dashboard-bibliotecario-page';
import { DashboardAdminPage } from './pages/admin/dashboard-admin-page/dashboard-admin-page';
import { AcercaDePage } from './pages/public/acerca-de-page/acerca-de-page';
import { CategoriaPage } from './pages/public/categoria-page/categoria-page';
import { CatalogoPage } from './pages/public/catalogo-page/catalogo-page';
import { ColeccionesPage } from './pages/public/colecciones-page/colecciones-page';
import { ContactoPage } from './pages/public/contacto-page/contacto-page';
import { UsuariosPage } from './pages/admin/usuarios-page/usuarios-page';
import { ReportesPage } from './pages/admin/reportes-page/reportes-page';
import { UsuariosDetailPage } from './pages/admin/usuarios-detail-page/usuarios-detail-page';
import { LibrosPage } from './pages/bibliotecario/libros-page/libros-page';
 
export const routes: Routes = [
    {
        path: '',
        component: IndexPage,
        title: 'Inicio'
    },
    {
        path: 'categoria/:slug',
        component: CategoriaPage,
        title: 'Libros por categoría'
    },
    {
        path: 'login',
        component: LoginPage,
        title: 'Iniciar sesión'
    },
    {
        path: 'registro',
        component: RegistroPage,
        title: 'Crear una cuenta'
    },{
        path: 'cliente/mis-reservas',
        component: MisReservasPage,
        title: 'Reservas realizadas'
    },{
        path: 'acerca-de',
        component: AcercaDePage,
        title: 'Acerca de la Biblioteca'
    },{
        path: 'catalogo',
        component: CatalogoPage,
        title: 'Catálogo',
    }, {
        path: 'colecciones',
        component: ColeccionesPage,
        title: 'Colecciones',
    }, {
        path: 'contacto',
        component: ContactoPage,
        title: 'Contáctanos',
    }, {
        path: 'admin',
        component: DashboardAdminPage,
        title: 'Dashboard',
    },{
        path: 'admin/usuarios',
        component: UsuariosPage,
        title: 'Listado de Usuarios'
    },{
        path: 'admin/usuarios-detalle/:id',
        component: UsuariosDetailPage,
        title: 'Detalle de un usuario'
    },{
        path: 'admin/reportes',
        component: ReportesPage,
        title: 'Listado de Préstamos'
    }, {
        path: 'bibliotecario',
        component: DashboardBibliotecarioPage,
        title: 'Dashboard',
    }, {
        path: 'bibliotecario/libros',
        component: LibrosPage,
        title: 'Listado de Libros',
    }, {
        path: '*',
        component: NotFoundPage,
        title: 'Página no encontrada'
    }

];
