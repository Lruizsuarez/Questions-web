import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlight'
})
export class HighlightPipe implements PipeTransform {

  transform(text: string, searchKeyword?: string): any {
    return searchKeyword ? text.replace(new RegExp(searchKeyword, 'gi' ), `<span class="highlight">${searchKeyword}</span>`)
      : text;
  }

}
