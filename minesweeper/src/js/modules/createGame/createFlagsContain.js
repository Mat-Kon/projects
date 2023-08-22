export const createFlagsContain = () => {
  const header = document.querySelector('.header');
  const flagsContain = document.createElement('div');
  const flagsContent = document.createElement('p');

  flagsContain.classList.add('flags-contain');
  flagsContent.classList.add('flags__content');

  header.append(flagsContain);
  flagsContain.append(flagsContent);
}