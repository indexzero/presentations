---
layout: center
---

<KineticSlide :spec="{
  background: 'hello.gif',
  timing: 'normal',
  lineSpacing: 'md',
  align: 'center',
  overlay: 0.7,
  sections: [
    {
      type: 'overlay',
      lines: [
        { text: '🛋️', role: 'normal', align: 'center', spaceAfter: 'md' },
        { text: 'ONE MUST FIRST RELAX', role: 'hero', color: 'cyan', align: 'center', spaceAfter: 'lg' },
        { text: 'Take a seat', role: 'connector', wings: 'md', align: 'center' },
        { text: 'Here\\'s my couch', role: 'connector', wings: 'md', align: 'center', spaceAfter: 'xl' },
        { text: 'I met Mikeal when he was', role: 'connector', wings: 'sm', align: 'center' },
        { text: 'DEVELOPER EVANGELIST', role: 'hero', color: 'green', align: 'center' },
        { text: 'before the term existed', role: 'connector', wings: 'md', align: 'center', spaceAfter: 'lg' },
        { text: 'for', role: 'connector', wings: 'sm', align: 'center' },
        { text: 'COUCH ONE', role: 'hero', color: 'pink', align: 'center' }
      ]
    }
  ]
}" />