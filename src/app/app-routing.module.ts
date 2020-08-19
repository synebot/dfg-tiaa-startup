import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { AppSectionResolver } from './app-communication/resolver/app-section-resolver.service';
import { HomeComponent } from './home/home.component';

/**
 * Developer : Onkar Kulkarni
 */

const routes: Routes = [
    {
        component: HomeComponent,
        path: 'home',
    },
    // {
    //     loadChildren: () => import('./app-section/app-section.module').then((m) => m.AppSectionModule),
    //     path: 'app-section',
    //     resolve: {
    //         sections: AppSectionResolver,
    //     },
    // },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/home',

    },
    // { path: 'path', component: FeatureComponent },
    // { path: '**', component: PageNotFoundComponent },
];

@NgModule({
    exports: [RouterModule],
    // imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    providers: [AppSectionResolver],
})
export class AppRoutingModule { }
