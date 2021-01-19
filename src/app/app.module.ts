import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { CommonModule, LocationStrategy, PathLocationStrategy } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';


import { AppComponent } from './app.component';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { HomeComponent } from './shared/home/home.component';
import { UpdateEmployeeComponent } from './update-employee/update-employee.component';
import { LoginComponent } from './login/login.component';


import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import {  GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';

import { authInterceptorProviders } from './interceptors/auth.interceptor';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';


import { SkeletonComponent } from './layout/skeleton/skeleton.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';
import { NavigationComponent } from './layout/navigation/navigation.component';



@NgModule({
  declarations: [
    AppComponent,
    SkeletonComponent,
    HeaderComponent,
    FooterComponent,

    
    EmployeeListComponent,
    CreateEmployeeComponent,
    UpdateEmployeeComponent,
    HomeComponent,
    LoginComponent,
    NavigationComponent
  ],
  imports: [

    BrowserModule,
    BrowserAnimationsModule,

    CoreModule,//core contiene todo lo que si o si se carga en la app
    SharedModule,//contiene servicios y componentes que se puede compartir en toda la app
    CommonModule,
    AppRoutingModule,

    SocialLoginModule
  ],
  providers: [
    {
      provide: LocationStrategy,//sirve para remover el # de las rutas de angular
      useClass:PathLocationStrategy
    },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider( '1004953359208-munnmg64kg6h333i7obngrb6f7bpnsi6.apps.googleusercontent.com')
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('861398024593664')
          }
        ]
      } as SocialAuthServiceConfig,
    },
    authInterceptorProviders 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


//core todo lo que se debe cargar desde le inicio
//data poner las constantes por ejemplo titulo del home de las paginas
//interfaces para que ciertos ddatos cumplan con ciertas caracteristicas
//mocks para datos dummy sino tienes un api funcional 
//schema para tener clases 
//services 


//layout van los componentes html bases de la app navigation footer header 
//modules van los modules como login register password ,modulos del negocio,modulo dashboarh favoritos etc
// shared van los componentes compartidos
//services van los services compartidos ejemplo un servicio que muestre un spinner o un modal de alerta
//en el app module van todos los modulos

//configurar el archivo tsconfig.json
//para poner los alias a las rutas
// "paths": {
//   "@core/*":["app/core/*"],
//   "@shared/*":["app/shared/*"],
//   "@components/*":["app/shared/*"],
//   "@env/*":["environments/*"],
//   "@modules/*":["app/modules/*"],
//   "@data/*":["app/data/*"],
//   "@layout":["app/layout/*"]
// }