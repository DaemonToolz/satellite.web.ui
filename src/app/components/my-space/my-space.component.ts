import { Component, OnInit, OnDestroy } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Files, FileType } from 'src/app/Models/files';
import { MatTreeFlattener, MatTreeFlatDataSource } from '@angular/material/tree';
import { MyspaceService } from 'src/app/services/spaces/myspace.service';
import { AuthservicesService } from 'src/app/services/authservices.service';
import { Observable, Subscription } from 'rxjs';
import { RabbitmqHubService } from 'src/app/services/notifications/rabbitmq-hub.service';
import { RabbitMqMsg, Status, Priority, InfoType } from 'src/app/Models/process/RabbitMqMsg';
import { SelectMultipleControlValueAccessor } from '@angular/forms';


class VirtualFile {
  public file: Files;
  public selected: boolean;

  public constructor(payload: Files, selection: boolean) {
    this.file = payload;
    this.selected = selection;
  }
}

@Component({
  selector: 'app-my-space',
  templateUrl: './my-space.component.html',
  styleUrls: ['./my-space.component.scss']
})
export class MySpaceComponent implements OnInit, OnDestroy {

  // Enums
  public Status = Status;
  public Priority = Priority;
  public InfoType = InfoType;

  private myFiles: VirtualFile[] = [];

  public FileType = FileType;
  public selectedFolder: Files;
  public files$: Observable<Files[]>;
  private profile$: Subscription;
  private spaceUpdates$: Subscription;

  public currentStatus: RabbitMqMsg;
  public statuses: RabbitMqMsg[] = [];
  public initializing: boolean = true;

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.clearSub();
  }

  private clearSub() {
    if (this.profile$)
      this.profile$.unsubscribe();
    if (this.spaceUpdates$)
      this.spaceUpdates$.unsubscribe();
  }

  public refreshFiles() {
    this.clearSub();
    this.profile$ = this.auth.userProfile$.subscribe(data => {
      if (data)
        this.files$ = this.spaceServices.getFiles(data.name)
    });
  }

  constructor(private auth: AuthservicesService, private spaceServices: MyspaceService, private updaters: RabbitmqHubService) {
    this.refreshFiles()

    this.spaceUpdates$ = this.updaters.mySpaceUpdate.subscribe(data => {
      if (data != null) {
        this.currentStatus = data;
        this.initializing = true; // data.status != Status.done;
        this.statuses.push(data);

        if(!this.initializing){
          this.statuses.splice(0);
        }
      }
    })
  }

  public initializeMySpace(){
    this.spaceServices.initSpace();
  }

  public fileDetails(filename: string): VirtualFile {
    return this.myFiles.find(data => data.file.name === filename);
  }

  public AbsolutePath(file: Files): string {
    return file == null ? "" : (file.parent != null ? (file.parent.name + "/" + file.name) : (file.name));
  }

  public get TotalSize(): number {
    return this.selectedFolder.children ? this.selectedFolder.children.filter(data => data.type === FileType.FILE).reduce((acc, cur) => acc + cur.size, 0) : 0;
  }

  public get oneSelection(): boolean {
    return this.myFiles.some(vf => vf.selected);
  }

}
