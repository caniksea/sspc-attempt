import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

// Import Containers
import {
    FullLayout,
    SimpleLayout
} from './containers';
import {RouteGuardService} from './shared/security/route-guard.service';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
    },
    {
        path: '',
        component: FullLayout,
        data: {
            title: 'Home'
        },
        children: [
            {
                path: 'dashboard',
                loadChildren: './views/dashboard/dashboard.module#DashboardModule',
                canActivate: [RouteGuardService]
            },
            {
                path: 'components',
                loadChildren: './views/components/components.module#ComponentsModule'
            },
            {
                path: 'icons',
                loadChildren: './views/icons/icons.module#IconsModule'
            },
            {
                path: 'widgets',
                loadChildren: './views/widgets/widgets.module#WidgetsModule'
            },
            {
                path: 'charts',
                loadChildren: './views/chartjs/chartjs.module#ChartJSModule'
            },
            {
                path: 'users',
                loadChildren: './views/users/users.module#UsersModule'
            },
            {
                path: 'profile',
                loadChildren: './views/profile/profile.module#ProfileModule'
            },
            {
                path: 'products',
                loadChildren: './views/products/products.module#ProductsModule'
            },
            {
                path: 'shop',
                loadChildren: './views/cart/cart.module#CartModule'
            }
        ]
    },
    {
        path: 'pages',
        component: SimpleLayout,
        data: {
            title: 'Pages'
        },
        children: [
            {
                path: '',
                loadChildren: './views/pages/pages.module#PagesModule',
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
