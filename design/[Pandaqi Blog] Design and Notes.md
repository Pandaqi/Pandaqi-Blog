# Pandaqi Blog

## Usage

Every article is within a folder. All of them have **\_index.md** (and trigger a list page), except the page itself, that is **index.md** (and triggers a single page).

A *multi part* series is within its own folder, with \_index.md specifying **multi: true**.

Naming:

-   Devlogs have **devlog-** prefix to folder name

-   Technical Devlogs have **tech-devlog-** prefix to folder name

-   These terms do *not* appear in the title itself => set them via **tags**

-   Multiparts simply use the "(Part X)" suffix to folder name.

Try to give everything a fitting *emoji* (in frontmatter).

Thumbnails are added with "thumbnail_media". The url there is *relative* to the current folder, which should resolve properly wherever you point to.
