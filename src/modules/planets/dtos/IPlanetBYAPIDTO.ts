export interface IPlanetByAPIDTO {
  count: number;
  next: number;
  previous: number;
  results: [
    {
      climate: string;
      created: string;
      diameter: string;
      edited: string;
      films: [string];
      gravity: string;
      name: string;
      orbital_period: string;
      population: string;
      residents: [string];
      rotation_period: string;
      surface_water: string;
      terrain: string;
      url: string;
    },
  ];
}
