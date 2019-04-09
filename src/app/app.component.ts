import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Luxe Dream Event Hire';

  schema = {
    '@context': 'http://schema.org',
    '@type': 'WebSite',
    'name': 'Luxe Dream Events',
    'url': 'http://luxedreameventhire.co.nz',
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+64-021-08793899",
      "contactType": "Customer service"
    }
  };

}
