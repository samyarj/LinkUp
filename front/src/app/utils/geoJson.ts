import { FeatureCollection } from 'geojson';
import { Note } from '../interfaces/note.interface';

export function parseNotesToGeoJson(notes: Note[]): FeatureCollection {
  return {
    type: 'FeatureCollection',
    features: notes.map((note: Note) => {
      return {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [note.location.location[0], note.location.location[1]],
        },
        properties: {
          id: note.id,
          title: note.title,
          description: note.description,
          date: note.date,
          expirationDate: note.expirationDate,
          isPublic: note.isPublic,
          publicationDate: note.publicationDate,
          userId: note.userId,
          messages: note.messages,
          ...(note as any).startingHour !== undefined && {
            startingHour: (note as any).startingHour,
            endingHour: (note as any).endingHour,
          },
        },
      };
    }),
  };
}
