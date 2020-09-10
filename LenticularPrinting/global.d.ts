declare module '*.vert';
declare module '*.frag';
declare module '*.svg';
declare module '*.html' {
  const template: string;
  export default template;
}
declare module '*.gif';
declare module '*.png';
declare module '*.jpg';
declare module '*.scss' {
  const content: { [className: string]: string };
  export default content;
}