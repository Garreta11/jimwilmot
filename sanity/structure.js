// https://www.sanity.io/docs/structure-builder-cheat-sheet

const hiddenDocTypes = (listItem) =>
  !['homepage', 'work', 'about', 'selectedProjects'].includes(listItem.getId());

export const structure = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Homepage')
        .child(
          S.editor()
            .id('singleton-homepage')
            .schemaType('homepage')
            .documentId('singleton-homepage')
        ),
      S.listItem()
        .title('Work page')
        .child(
          S.editor()
            .id('singleton-work')
            .schemaType('work')
            .documentId('singleton-work')
        ),
      S.listItem()
        .title('About page')
        .child(
          S.editor()
            .id('singleton-about')
            .schemaType('about')
            .documentId('singleton-about')
        ),
      ...S.documentTypeListItems().filter(hiddenDocTypes),
      S.listItem()
        .title('Selected Projects')
        .child(
          S.editor()
            .id('selectedProjects')
            .schemaType('selectedProjects')
            .documentId('selectedProjects')
        ),
    ]);
