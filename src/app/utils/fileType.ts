import { AbstractControl, FormControl } from "@angular/forms";
export function requiredFileType(type: string[]) {
  return function(control: FormControl) {
    const file = control.value;
    
    if (file) {
      // console.log(file);
      let path = file.name.replace(/^.*[\\\/]/, "");
      //   var el_down = path
      //     .split("\\")
      //     .pop()
      //     .split("/")
      //     .pop();

      const extension = path.split(".")[1].toUpperCase();
      //console.log(extension + "extension" + type.length);
      let existValue: boolean = false;
      for (let i = 0; i < type.length; i++) {
        let typeFile = type[i].toUpperCase();
        if (typeFile === extension.toUpperCase()) {
          //console.log("type" + typeFile);
          existValue = true;
        }
      }
      if (existValue == true) {
        return null;
      } else {
        return {
          requiredFileType: true
        };
      }
    }
    return null;
  };
}