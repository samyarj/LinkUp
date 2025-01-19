interface PinClass {
    key: string;
    iconName: string;
    id: string;
    features?: GeoJSON.FeatureCollection;
    bounds: { low: number; high: number };
  }