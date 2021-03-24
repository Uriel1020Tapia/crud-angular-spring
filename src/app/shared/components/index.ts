// import components
import { CardUserComponent} from './cards/card-user/card-user.component';
import { CarouselComponent } from './carousel/carousel.component';
import { TitleH5Component } from './titles/title-h5/title-h5.component';

// loader tipo facebook

import { CardLoaderComponent } from './loaders/card-loader/card-loader.component';

//Autocompletes
import { GoogleAutocompleteComponent } from './autocompletes/google-autocomplete/google-autocomplete.component';

//DropZone
import { FDropzoneComponent } from './form/f-dropzone/f-dropzone.component';

import { FInputFileComponent } from './form/f-input-file/f-input-file.component';

export const components: any [] =[
   CardUserComponent,
   CardLoaderComponent,
   TitleH5Component,
   // loader tipo facebook
   CarouselComponent,
   //Autocomplete
   GoogleAutocompleteComponent,

   //DropZone
   FDropzoneComponent,
   FInputFileComponent
];


// export all components
export * from './cards/card-user/card-user.component';
export * from './titles/title-h5/title-h5.component';
export * from './carousel/carousel.component';

// loader tipo facebook
export * from './loaders/card-loader/card-loader.component';

//Autocompletes
export * from './autocompletes/google-autocomplete/google-autocomplete.component';

//DropZone
//Autocompletes
export * from './form/f-dropzone/f-dropzone.component';
export * from  './form/f-input-file/f-input-file.component';
