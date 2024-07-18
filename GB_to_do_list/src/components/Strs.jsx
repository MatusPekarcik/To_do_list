String.prototype.posCI = function(s) {
  return this.toLowerCase().indexOf(s.toLowerCase());
}


String.prototype.fileMatch = function(mask) {

  let escapedPattern = mask.replace(/[.+^${}()|[\]\\]/g, '\\$&');
  
  // Replace DOS wildcards with regex wildcards
  escapedPattern = escapedPattern.replace(/\*/g, '.*');
  escapedPattern = escapedPattern.replace(/\?/g, '.');
  
  // Create a regex object
  return new RegExp('^' + escapedPattern + '$', 'i').test(this);
}


String.prototype.beforeStr = function(ch) {  
  let i = this.indexOf(ch);
  if (i!=-1) return this.substring(0,i).trim();
  else return this.toString().trim()
}

String.prototype.afterStr = function(ch) {
  let i = this.indexOf(ch);
  if (i!=-1) return this.substring(i+ch.length).trim()
  else return ''
}

String.prototype.beforeStrCI = function(ch) {  
  let i = this.posCI(ch);
  if (i!=-1) return this.substring(0,i).trim();
  else return this.toString().trim()
}

String.prototype.afterStrCI = function(ch) {
  let i = this.posCI(ch);
  if (i!=-1) return this.substring(i+ch.length).trim()
  else return ''
}

String.prototype.find_in_set = function(list) {
  let i=0;
  if (list!=undefined) 
  while (list!='') {
    if (list.beforeStr(',').cmpCI(this)) return i;
    list=list.afterStr(',');
    i++;
  }
  return -1;
}

String.prototype.quote = function(ch) {
  if (!ch) ch='"';
  return ch+this+ch
}

String.prototype.unquote = function(ch) {
  let x=this.length;
  console.log('unquote',this,ch,)

  if(x<1) return this;
  if(this[0]!=this[x-1]) return this;
  if (ch) { if(this[0]!=ch) return this }
  else if (this[0]!='"' && this[0]!="'") return this;    
  
  return this.substring(1,x-1);
}




String.prototype.findCI = function(str) {
  return this.toLowerCase().indexOf(str.toLowerCase());  
}

String.prototype.lastChr = function(chrs) {
  let res = -1;
  for (let ch of chrs) {
    let i = this.indexOf(ch);
    if (i>res) res=i; 
  }
  return res
}

String.prototype.firstChr = function(chrs) {
  let res = -1;
  for (let ch of chrs) {
    let i = this.indexOf(ch);
    if (i!=-1 && i<res) res=i; 
  }
  return res
}

String.prototype.cmpCI = function(str) {
  return this.toLowerCase() === str.toLowerCase()
}

String.prototype.getFileExt = function() {
  const i=this.lastChr(".\\/:");
  if (i!=-1 && this[i]=='.') return this.substring(i+1)
  else return ''
}
String.prototype.getFileName = function(ext) {
  const i = this.lastChr("\\/:");
  let fn;
  if (i!=-1) fn = this.substring(i+1)
  else       fn = this.toString();
  
  if(ext==undefined) return fn;
  
  fn=fn.beforeStr('.');
  
  return (ext)?fn+'.'+ext:fn;
  
}
String.prototype.getFilePath = function() {
  const i = this.lastChr("\\/:");
  if (i!=-1) return this.substring(0,i+1)
  else return ''
}
