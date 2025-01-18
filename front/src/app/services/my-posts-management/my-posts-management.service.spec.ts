import { TestBed } from '@angular/core/testing';

import { MyPostsManagementService } from './my-posts-management.service';

describe('MyPostsManagementService', () => {
  let service: MyPostsManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyPostsManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
