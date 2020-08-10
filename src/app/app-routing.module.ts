import { NgModule               } from '@angular/core';
import { RouterModule, Routes   } from '@angular/router';
import { AppSectionResolver     } from './app-communication/resolver/app-section-resolver.service';

/**
 * Developer : Onkar Kulkarni
 */

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/app-section',
        resolve: {
            sections : AppSectionResolver,
        },

    },
    // { path: 'path', component: FeatureComponent },
    // { path: '**', component: PageNotFoundComponent },
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forRoot(routes, {useHash: true})],
    providers: [AppSectionResolver],
})
export class AppRoutingModule {}
