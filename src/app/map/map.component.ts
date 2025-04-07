import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { ActivatedRoute } from '@angular/router';

type LocationKey = keyof typeof LOCATION_COORDS;

const LOCATION_COORDS = {
  "Beaugrenelle": [48.8494, 2.2825],
  "Champs-Élysées": [48.86956331476661, 2.307246944180809],
  "La Villette": [48.89604181534238, 2.388668071163838],
  "Vaise":  [45.78778957408654, 4.811962768456971],
  "Carré de Soie": [45.76465763076027, 4.92142731825799],
  "Bellecour": [45.759061817178846, 4.835042416154136],
  "Madeleine": [43.300592716370865, 5.399968614634178],
  "Plan de campagne": [43.413686749819426, 5.361949224599023],
  "La Joliette": [43.31193875549172, 5.368328783330444],
  "Lingostière": [43.727132174676996, 7.189998685916656],
  "Masséna": [43.7022971458904, 7.26687571590715],
  "Gare du Sud": [43.70945556304295, 7.260356915344646],
} satisfies Record<string, L.LatLngExpression>;

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [LeafletModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})

export class MapComponent implements OnInit {
  private map!: L.Map;
  private readonly defaultCoords: L.LatLngExpression = [48.8566, 2.3522]; 
  private readonly defaultZoom = 15;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const locationName = 'Cinema ' + this.route.snapshot.queryParamMap.get('cinema') as LocationKey | null;

    const coords = locationName && LOCATION_COORDS[locationName]
      ? LOCATION_COORDS[locationName]
      : this.defaultCoords;

    const title = locationName ?? 'Defaut Cinema';

    this.initMap(coords, title);
  }

  private initMap(coords: L.LatLngExpression, title: string): void {
    this.map = L.map('map').setView(coords, this.defaultZoom);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);

    this.addMarker(coords, title);
  }

  private addMarker(coords: L.LatLngExpression, title: string): void {
    L.marker(coords)
      .addTo(this.map)
      .bindPopup(`<b>${title}</b>`)
      .openPopup();
  }
}