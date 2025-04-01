// https://www.sanity.io/docs/structure-builder-cheat-sheet

import {
  AiFillHome,
  AiFillProject,
  AiFillInfoCircle,
  AiFillAppstore,
} from 'react-icons/ai';

const hiddenDocTypes = (listItem) =>
  !['homepage', 'work', 'about', 'selectedProjects'].includes(listItem.getId());

export const structure = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Homepage')
        .icon(AiFillHome) // Add an icon
        .child(
          S.editor()
            .id('singleton-homepage')
            .schemaType('homepage')
            .documentId('singleton-homepage')
        ),
      S.listItem()
        .title('About page')
        .icon(AiFillInfoCircle)
        .child(
          S.editor()
            .id('singleton-about')
            .schemaType('about')
            .documentId('singleton-about')
        ),
      ...S.documentTypeListItems().filter(hiddenDocTypes),
      S.listItem()
        .title('Selected Projects')
        .icon(AiFillProject) // Different icon
        .child(
          S.editor()
            .id('selectedProjects')
            .schemaType('selectedProjects')
            .documentId('selectedProjects')
        ),
    ]);
