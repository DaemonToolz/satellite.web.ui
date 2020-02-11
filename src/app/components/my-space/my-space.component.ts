import { Component, OnInit } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Files, FileType } from 'src/app/Models/files';
import { MatTreeFlattener, MatTreeFlatDataSource } from '@angular/material/tree';


class VirtualFile{
  public file: Files;
  public selected: boolean;
}

@Component({
  selector: 'app-my-space',
  templateUrl: './my-space.component.html',
  styleUrls: ['./my-space.component.scss']
})
export class MySpaceComponent implements OnInit {
  private myFiles: VirtualFile[] = [];

  public FileType = FileType;
  public selectedFolder: Files;

  ngOnInit() {
  }


  constructor() {
    let root = new Files();
    root.name = "/";
    root.size = 0;
    root.type = FileType.FOLDER;
    root.children = [];

    
    
    for (let i = 0; i < 100; ++i) {
      let file = new Files();
      file.name = "File#" + i;
      file.size = 650;
      file.type = (i % 5 === 0 ? FileType.FOLDER : FileType.FILE)
      file.parent = root;

      root.children.push(file);
      let vf = new VirtualFile();
      vf.file = file;
      vf.selected = false;
      this.myFiles.push(vf)
    }
    let vf = new VirtualFile();
    vf.file = root;
    vf.selected = false;
    this.myFiles.push(vf)
    this.selectedFolder = root;
  }


  public fileDetails(filename: string): VirtualFile {
    return this.myFiles.find(data => data.file.name === filename);
  }

  public AbsolutePath(file: Files): string {
    return file.parent != null ? (file.parent.name + "/" + file.name) : (file.name);
  }

  public get TotalSize(): number {
    return this.selectedFolder.children ? this.selectedFolder.children.filter(data => data.type === FileType.FILE).reduce((acc, cur) => acc + cur.size, 0) : 0 ;
  }

  public get oneSelection(): boolean{
    return this.myFiles.some(vf => vf.selected);
  }

}
