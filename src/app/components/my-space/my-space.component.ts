import { Component, OnInit, OnDestroy } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Files, FileType } from 'src/app/Models/files';
import { MatTreeFlattener, MatTreeFlatDataSource } from '@angular/material/tree';
import { MyspaceService } from 'src/app/services/spaces/myspace.service';
import { AuthservicesService } from 'src/app/services/authservices.service';
import { Observable, Subscription } from 'rxjs';
import { RabbitmqHubService } from 'src/app/services/notifications/rabbitmq-hub.service';
import { RabbitMqMsg, Status, Priority, InfoType, MySpaceEvents, FilewatchEvents } from 'src/app/Models/process/RabbitMqMsg';
import { SelectMultipleControlValueAccessor } from '@angular/forms';
import { ThrowStmt } from '@angular/compiler';
import { SpaceValidation } from 'src/app/Models/space';


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
  private update$: Subscription;

  private onFolderChanged$: Subscription;
  
  public isOnError : boolean = false;
  public lastError : Error;
  private onErrorSub : Subscription;

  public get coverPicture(){
    return this.spaceServices.ProfilePicture
  }

  public get hasCoverPicture(){
    return this.spaceServices.coverPictureLoaded
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.clearSub();
    this.onFolderChanged$.unsubscribe();
    this.onErrorSub.unsubscribe();
  }

  private clearSub() {
    if (this.profile$)
      this.profile$.unsubscribe();
  }

  public refreshFiles() {
    this.clearSub();

    this.profile$ = this.auth.userProfile$.subscribe(data => {
      if (data) {
        this.spaceServices.updateExists()
        this.files$ = this.spaceServices.getCurrentFolder()
      }

    });
  }

  public get statuses(){
    return this.spaceServices.statuses;
  }

  public get loading(){
    return this.spaceServices.loading;
  }

  constructor(private auth: AuthservicesService, public spaceServices: MyspaceService) {

    this.onErrorSub = this.spaceServices.onError.subscribe(error => {
      this.isOnError = (error != null);
      this.lastError = error; 
    
    })

    this.onFolderChanged$ = this.spaceServices.folderChanged.subscribe(data => {
      this.refreshFiles();
    });
 
  }


  public initializeMySpace() {
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

  public isOngoing(data: RabbitMqMsg): boolean {
    return data.status === Status.ongoing
  }

  public setCurrentFolder(node: Files) {
    if (node?.type === FileType.FOLDER) {
      this.spaceServices.CurrentFolder = node.name;
    }
  }

  public travelTo(index: number) {
    if (index >= 0 && index < this.spaceServices.folders.length) {
      this.spaceServices.TravelBack = index;
    }
  }

  public get myConfig() : SpaceValidation{
    return this.spaceServices.myConfig;
  }



}
