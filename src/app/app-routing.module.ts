import { NgModule               } from '@angular/core';
import { RouterModule, Routes   } from '@angular/router';
import { AppSectionResolver     } from './app-communication/resolver/app-section-resolver.service';

/**
 * Developer : Onkar Kulkarni
 */

const routes: Routes = [
    {
        path: '',
        redirectTo: '/app-section',
        pathMatch: 'full',
        resolve: {
            sections : AppSectionResolver
        }

    },
    // { path: 'path', component: FeatureComponent },
    // { path: '**', component: PageNotFoundComponent },
];


@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true})],
    exports: [RouterModule],
    providers: [AppSectionResolver]
})
export class AppRoutingModule {}
