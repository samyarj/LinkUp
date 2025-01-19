import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, ComponentFactoryResolver, ApplicationRef, Injector } from '@angular/core';
import { Event, Note } from '../../interfaces/note.interface';
import { Subject } from 'rxjs';
import { PostService } from '../../services/post-service/post.service';
import { FriendsService } from '../../services/friends-service/friends.service';
import { AppUser } from '../../interfaces/user.interface';
import * as mapboxgl from 'mapbox-gl';
import { parseNotesToGeoJson } from '../../utils/geoJson';
import { PopupComponent } from './popup/popup.component';
interface PinClass {
  isEvent?: boolean;
  isFriend: boolean;
  iconName: string;
  features?: GeoJSON.FeatureCollection;
}
@Component({
  selector: 'app-navigate-page',
  templateUrl: './navigate-page.component.html',
  styleUrls: ['./navigate-page.component.scss']
})
export class NavigatePageComponent implements OnInit, OnDestroy {
  @ViewChild('sidebar') sidebar!: any;

  public map!: mapboxgl.Map;

  public pinClasses: PinClass[] = [
    {
      isEvent: true,
      isFriend: true,
      iconName: "event",
    },
    {
      isEvent: true,
      isFriend: false,
      iconName: "event",
    },
    {
      isEvent: false,
      isFriend: true,
      iconName: "public-note",
    },
    {
      isEvent: false,
      isFriend: false,
      iconName: "private-note",
    },
  ];
  public notes: Note[] = [
    {
      id: '1',
      title: 'Note 1',
      description: 'This is a description for Note 1',
      publicationDate: new Date(),
      date: new Date(),
      expirationDate: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 7),
      location: { location: [-73.5673, 45.5017] },
      isPublic: true,
      userId: 'user1',
      messages: [],
    },
    {
      id: '2',
      title: 'Note 2',
      description: 'This is a description for Note 2',
      publicationDate: new Date(),
      date: new Date(),
      expirationDate: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 7), // 7 days later
      location: { location: [-73.5573, 45.5117] },
      isPublic: false,
      userId: 'user2',
      messages: [],
    },
  ];

  public events: Event[] = [
    {
      id: '1',
      title: 'Event 1',
      description: 'This is a description for Event 1',
      publicationDate: new Date(),
      date: new Date(),
      expirationDate: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 7),
      location: { location: [-73.5773, 45.5217] },
      isPublic: true,
      userId: 'user1',
      messages: [],
      startingHour: 10,
      endingHour: 12,
    },
    {
      id: '2',
      title: 'Event 2',
      description: 'This is a description for Event 2',
      publicationDate: new Date(),
      date: new Date(),
      expirationDate: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 7),
      location: { location: [-73.5473, 45.5317] },
      isPublic: false,
      userId: 'user3',
      messages: [],
      startingHour: 14,
      endingHour: 16,
    },
  ];
  public friendIds: string[] = ["user1"];
  public displayFriendOnly = false;
  public sidebarOpened = true;
  public hoveredNote: Note | null = null;

  private unsubscribe$ = new Subject<void>();

  constructor(
    private postService: PostService, private friendService: FriendsService, private componentFactoryResolver: ComponentFactoryResolver, private injector: Injector, private appRef: ApplicationRef

  ) {}

  ngOnInit(): void {
    // this.setUpPosts();
  }


  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }


  onMapLoad(map: mapboxgl.Map): void {
    this.map = map; 
    this.subscribeToPosts();

    this.pinClasses.forEach((pinClass) => {
      const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false,
      });
  
      this.map.on('mouseenter', pinClass.iconName, (e: any) => {
        this.map.getCanvas().style.cursor = 'pointer';
  
        const coordinates = e.features[0].geometry.coordinates.slice();
        const properties = e.features[0].properties;
  
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }
        const popupElement = this.createPopupComponent(properties);

        const popup = new mapboxgl.Popup({
          closeButton: false,
          closeOnClick: false,
        })
        .setLngLat(coordinates)
        .setDOMContent(popupElement)
        .addTo(this.map);
        setTimeout(() => {
          popup.remove();
        }, 3000);
      });
  
      this.map.on('mouseleave', pinClass.iconName, () => {
        this.map.getCanvas().style.cursor = '';
      });
    });
  }

  createPopupComponent(properties: any): HTMLElement {
    const container = document.createElement('div');
  
    const factory = this.componentFactoryResolver.resolveComponentFactory(PopupComponent);
    const componentRef = factory.create(this.injector);
  
    componentRef.instance.element = properties;
  
    this.appRef.attachView(componentRef.hostView);
  
    container.appendChild((componentRef.hostView as any).rootNodes[0]);
  
    return container;
  }

  private subscribeToPosts(): void {
    this.pinClasses.forEach((item) => {
      this.loadImageFromUrl(
        `assets/images/${item.iconName}.png`,
        item.iconName
      );
    });
    this.pinClasses.forEach((item) => {

      const privateEvents = this.events.filter((event) => this.friendIds.includes(event.userId));
      const publicEvents = this.events.filter((event) => !this.friendIds.includes(event.userId));
      const privateNotes = this.notes.filter((note) => this.friendIds.includes(note.userId));
      const publicNotes = this.notes.filter((note) => !this.friendIds.includes(note.userId));
      
      if (item.isEvent && item.isFriend) {
        item.features = parseNotesToGeoJson(privateEvents);
      } else if (item.isEvent && !item.isFriend) {
        item.features = parseNotesToGeoJson(publicEvents);
      } else if (!item.isEvent && item.isFriend) {
        item.features = parseNotesToGeoJson(privateNotes);
      } else {
        item.features = parseNotesToGeoJson(publicNotes);
      }

  });

  }

  loadImageFromUrl( url: string, imageId: string) {
    this.map.loadImage(url, (error, image) => {
      if (error) throw error;
      if (!this.map.hasImage(imageId)) {
        this.map.addImage(imageId, image as ImageBitmap);
      }
    });
  }

  // #############################
  

  
  
  public toggleSidebar(): void {
    this.sidebarOpened = !this.sidebarOpened;
  }

  public toggleFriendOnly(): void {
    this.displayFriendOnly = !this.displayFriendOnly;
    //this.getFriends();
  }

  public showPopup(note: Note): void {
    this.hoveredNote = note;
  }

  public hidePopup(): void {
    this.hoveredNote = null;
  }


  // private setUpPosts(): void {
  //   this.postService.getAllNotes().pipe(takeUntil(this.unsubscribe$)).subscribe((notes: Note[]) => {
  //     this.notes = notes;
  //     this.addMarkersToMap();
  //   });

  //   this.postService.getAllEvents().pipe(takeUntil(this.unsubscribe$)).subscribe((events: Event[]) => {
  //     this.events = events;
  //     this.addMarkersToMap();
  //   });

  //   this.getFriends();
  // }

  // private getFriends(): void {
  //   const user: AppUser | null = this.getStoredUser();
  //   if (user) {
  //     this.friendService.getAllFriends(user.id).pipe(takeUntil(this.unsubscribe$)).subscribe((friends: AppUser[]) => {
  //       this.friendIds = friends.map(friend => friend.id);
  //       this.addMarkersToMap();
  //     });
  //   }
  // }

  private clearMapMarkers(): void {
    const markers = document.querySelectorAll('.mapboxgl-marker');
    markers.forEach(marker => marker.remove());
  }

  private getStoredUser(): AppUser | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
}
