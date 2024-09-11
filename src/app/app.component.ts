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

  constructor(
    private countryService: CountryService,
    private renderer: Renderer2, 
    private el: ElementRef 
  ) {}

  ngOnInit(): void {
    this.countryService.getCountries().subscribe(
      (data) => {
        console.log('API Data:', data);
        this.countries = data[1]; 
      },
      (error) => {
        console.error('API Error:', error);
      }
    );

    this.addHoverListeners();
  }

 
  onHover(event: MouseEvent): void {
    const target = event.target as SVGElement;
    if (target) {
      this.renderer.setStyle(target, 'fill', 'purple'); 
    }
  }

  onLeave(event: MouseEvent): void {
    const target = event.target as SVGElement;
    if (target) {
      this.renderer.setStyle(target, 'fill', ''); 
    }
  }

  addHoverListeners(): void {
    const paths = this.el.nativeElement.querySelectorAll('svg path'); 
    paths.forEach((path: SVGElement) => {
      this.renderer.listen(path, 'mouseover', (event) => this.onHover(event));
      this.renderer.listen(path, 'mouseout', (event) => this.onLeave(event));
    });
  }
}



