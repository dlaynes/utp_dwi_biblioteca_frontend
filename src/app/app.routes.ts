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
import { DetalleLibroPage } from './pages/bibliotecario/detalle-libro-page/detalle-libro-page';
import { AutoresPage } from './pages/bibliotecario/autores-page/autores-page';
import { AutoresDetailPage } from './pages/bibliotecario/autores-detail-page/autores-detail-page';
import { EditorialesDetailPage } from './pages/bibliotecario/editoriales-detail-page/editoriales-detail-page';
import { EditorialesPage } from './pages/bibliotecario/editoriales-page/editoriales-page';
import { DetalleLibroPage as PublicDetalleLibroPage }  from './pages/public/detalle-libro-page/detalle-libro-page';
import { PrestamosPage } from './pages/bibliotecario/prestamos-page/prestamos-page';
import { PrestamosDetailPage } from './pages/bibliotecario/prestamos-detail-page/prestamos-detail-page';
import { PrestarLibroFormPage } from './pages/bibliotecario/prestar-libro-form-page/prestar-libro-form-page';
import { RecibirLibroFormPage } from './pages/bibliotecario/recibir-libro-form-page/recibir-libro-form-page';
 
export const routes: Routes = [
    {
        path: '',
        component: IndexPage,
        title: 'Inicio'
    }, {
        path: 'categoria/:slug',
        component: CategoriaPage,
        title: 'Libros por categoría'
    }, {
        path: 'login',
        component: LoginPage,
        title: 'Iniciar sesión'
    }, {
        path: 'registro',
        component: RegistroPage,
        title: 'Crear una cuenta'
    }, {
        path: 'cliente/mis-reservas',
        component: MisReservasPage,
        title: 'Reservas realizadas'
    }, {
        path: 'acerca-de',
        component: AcercaDePage,
        title: 'Acerca de la Biblioteca'
    }, {
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
    },{
         path: 'detalle-libro/:id',
        component: PublicDetalleLibroPage,
        title: 'Detalle de un libro',
    }, {
        path: 'admin',
        component: DashboardAdminPage,
        title: 'Dashboard',
    }, {
        path: 'admin/usuarios',
        component: UsuariosPage,
        title: 'Listado de Usuarios'
    }, {
        path: 'admin/usuarios/:id',
        component: UsuariosDetailPage,
        title: 'Detalle de un usuario'
    }, {
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
        path: 'bibliotecario/libros/:id',
        component: DetalleLibroPage,
        title: 'Detalle de un libro',
    }, {
        path: 'bibliotecario/autores',
        component: AutoresPage,
        title: 'Listado de Autores',
    }, {
        path: 'bibliotecario/autores/:id',
        component: AutoresDetailPage,
        title: 'Detalle de un autor',
    }, {
        path: 'bibliotecario/editoriales',
        component: EditorialesPage,
        title: 'Listado de Editoriales',
    }, {
        path: 'bibliotecario/editoriales/:id',
        component: EditorialesDetailPage,
        title: 'Detalle de una editorial',
    }, {
        path: 'bibliotecario/prestamos',
        component: PrestamosPage,
        title: 'Listado de Préstamos',
    }, {
        path: 'bibliotecario/prestamos/:id',
        component: PrestamosDetailPage,
        title: 'Detalle de un préstamo'
    }, {
        path: 'bibliotecario/prestar-libro/:id',
        component: PrestarLibroFormPage,
        title: 'Prestar un libro'
    }, {
        path: 'bibliotecario/recibir-libro/:id',
        component: RecibirLibroFormPage,
        title: 'Recibir un libro prestado'
    }, {
        path: '*',
        component: NotFoundPage,
        title: 'Página no encontrada'
    }
];
