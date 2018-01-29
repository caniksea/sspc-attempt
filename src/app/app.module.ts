import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {LocationStrategy, HashLocationStrategy, CommonModule} from '@angular/common';

import {AppComponent} from './app.component';

// Import containers
import {
    FullLayout,
    SimpleLayout
} from './containers';

const APP_CONTAINERS = [
    FullLayout,
    SimpleLayout
]

// Import components
import {
    AppAside,
    AppBreadcrumbs,
    AppFooter,
    AppHeader,
    AppSidebar,
    AppSidebarFooter,
    AppSidebarForm,
    AppSidebarHeader
} from './components';

const APP_COMPONENTS = [
    AppAside,
    AppBreadcrumbs,
    AppFooter,
    AppHeader,
    AppSidebar,
    AppSidebarFooter,
    AppSidebarForm,
    AppSidebarHeader
]

// Import directives
import {
    AsideToggleDirective,
    NAV_DROPDOWN_DIRECTIVES,
    SIDEBAR_TOGGLE_DIRECTIVES
} from './directives';

const APP_DIRECTIVES = [
    AsideToggleDirective,
    NAV_DROPDOWN_DIRECTIVES,
    SIDEBAR_TOGGLE_DIRECTIVES
]

// Import routing module
import {AppRoutingModule} from './app.routing';

// Import 3rd party components
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {TabsModule} from 'ngx-bootstrap/tabs';
import {ChartsModule} from 'ng2-charts/ng2-charts';
import {RouteGuardService} from './shared/security/route-guard.service';
import {LoginModule} from './views/login/login.module';
import {StoreModule} from '@ngrx/store'
import {Reducers} from './views/login/reducers/reducers';
import {HttpModule, JsonpModule} from "@angular/http";
import {FormsModule} from "@angular/forms";

@NgModule({
    imports: [
        BrowserModule,
        AppRoutingModule,
        BsDropdownModule.forRoot(),
        TabsModule.forRoot(),
        ChartsModule,
        LoginModule,
        StoreModule.provideStore(Reducers),
        HttpModule,
        JsonpModule,
        CommonModule,
        FormsModule
    ],
    declarations: [
        AppComponent,
        ...APP_CONTAINERS,
        ...APP_COMPONENTS,
        ...APP_DIRECTIVES
    ],
    providers: [{
        provide: LocationStrategy,
        useClass: HashLocationStrategy
    }, RouteGuardService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
