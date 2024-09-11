import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountryService } from './country.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class AppComponent implements OnInit {
  countries: any[] = [];
  hoveredCountryDetails: any = null;  

  constructor(
    private countryService: CountryService,
    private renderer: Renderer2,
    private el: ElementRef
  ) {}

  ngOnInit(): void {
    // Fetch the list of countries
    this.countryService.getCountries().subscribe(
      (data) => this.countries = data[1], 
      (error) => console.error('API Error:', error)
    );

    this.addHoverListeners();
  }

 
  onHover(event: MouseEvent, countryCode: string): void {
    const target = event.target as SVGElement;
    if (target) {
      this.renderer.setStyle(target, 'fill', 'purple'); 

      this.countryService.getCountryDetails(countryCode).subscribe(
        (data) => this.hoveredCountryDetails = data[1]?.[0] || null,
        (error) => console.error('API Error:', error)
      );
    }
  }

  onLeave(event: MouseEvent): void {
    const target = event.target as SVGElement;
    if (target) {
      this.renderer.setStyle(target, 'fill', '');  
      this.hoveredCountryDetails = null;  
    }
  }

  
  addHoverListeners(): void {
    const paths = this.el.nativeElement.querySelectorAll('svg path'); 
    paths.forEach((path: SVGElement) => {
      const countryCode = path.getAttribute('id'); 
      if (countryCode) {
        this.renderer.listen(path, 'mouseover', (event) => this.onHover(event, countryCode)); 
        this.renderer.listen(path, 'mouseout', (event) => this.onLeave(event));  
      }
    });
  }
}




