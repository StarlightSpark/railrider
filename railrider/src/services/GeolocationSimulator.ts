// interface Position {
//   coordinates: [number, number]
//   speed?: number
// }
// type GeolocationPath = Position[];

// const KM_IN_DEGREE = 110.562;

// class GeolocationSimulator {
//   #path: GeolocationPath
//   #currentSpeed: number = 0
//   #index = 0
//   #currentLocation = {
//     coords: {
//       latitude: null,
//       longitude: null,
//       accuracy: 1,
//       altitude: null,
//       altitudeAccuracy: null,
//       heading: null,
//       speed: null
//     }
//   }

//   constructor(path: GeolocationPath) {
//     this.#path = path;
//   }

//   #nextCoordinate(): void {
//     const currentPos: Position = this.#path[this.#index];
//     const nextPos: Position = this.#path[this.#index + 1];
    
//     // TODO: calc, tween
//     const speed = 69;

//     Object.assign(this.#currentLocation, {
//       latitude: currentPos.coordinates[0],
//       longitude: currentPos.coordinates[1],
//       speed
//     })

//     ++this.#index;
//   }

//   start(): void {
//     this.#index = 0;
//     this.#nextCoordinate();
//   }
// }
