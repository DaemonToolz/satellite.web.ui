import { Component, OnInit, OnDestroy } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Files, FileType } from 'src/app/Models/files';
import { MatTreeFlattener, MatTreeFlatDataSource } from '@angular/material/tree';
import { MyspaceService } from 'src/app/services/spaces/myspace.service';
import { AuthservicesService } from 'src/app/services/authservices.service';
import { Observable, Subscription } from 'rxjs';


class VirtualFile{
  public file: Files;
  public selected: boolean;

  public constructor(payload : Files, selection :boolean){
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

  private myFiles: VirtualFile[] = [];

  public FileType = FileType;
  public selectedFolder: Files;
  public files$ : Observable<Files[]>;



  ngOnInit() {
  }

  ngOnDestroy(): void {

  }

  public refreshFiles(){
    this.files$ = this.spaceServices.getFiles("axel.maciejewski");
    
    /*.subscribe(data => {
      let root = new Files();
      root.name = "/";
      root.size = 0;
      root.type = FileType.FOLDER;
      root.children = data;
      data.forEach(file => file.parent = root)
      this.selectedFolder = root;
      this.myFiles = data.map(file => new VirtualFile(file, false));
    });*/

    
  }

  constructor(private auth: AuthservicesService, private spaceServices: MyspaceService) {
    this.refreshFiles()
  }


  public fileDetails(filename: string): VirtualFile {
    return this.myFiles.find(data => data.file.name === filename);
  }

  public AbsolutePath(file: Files): string {
    return file == null ? "" : (file.parent != null ? (file.parent.name + "/" + file.name) : (file.name));
  }

  public get TotalSize(): number {
    return this.selectedFolder.children ? this.selectedFolder.children.filter(data => data.type === FileType.FILE).reduce((acc, cur) => acc + cur.size, 0) : 0 ;
  }

  public get oneSelection(): boolean{
    return this.myFiles.some(vf => vf.selected);
  }

}
