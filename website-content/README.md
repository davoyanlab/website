# Editing the Website — Start Here

Welcome! This is the **only folder on this website you ever need to open.**
Everything in here is safe to change. Nothing outside this folder needs your
attention — that's the technical machinery that makes the website work, and
it's looked after separately.

Every page of the website has its own folder here, and inside each page's
folder there are always two things:

- **`text`** — the words on the page (titles, paragraphs, names, etc.)
- **`images`** — the photos on the page

## Which folder is which page?

| Website page | Folder |
|---|---|
| Homepage | `homepage` |
| Research | `research` |
| Team | `team` |
| Publications | `publications` |
| Contact | `contact` |
| Virtual Lab Tour | `virtual-lab-tour` |

For example, to change a photo of a team member, go into `team`, then
`images`, then `photos`.

## How to change text

1. Open the `text` folder for the page you want to change.
2. Open the file inside it (it ends in `.md` or `.yml`) with any plain text
   editor, or on GitHub's website (click the pencil ✏️ icon).
3. At the top of most files, you'll see a block that looks like this:

   ```
   ---
   title: "Pushing the limits of space exploration."
   subtitle: "At UCLA in Los Angeles, California, we develop..."
   ---
   ```

   To change what's on the website, just change the words **inside the
   quotation marks**. Leave everything else (the field name, the colon, the
   quotation marks themselves) exactly as it is.

4. Some files also have a paragraph of plain writing below that block — just
   edit it like a normal document, no quotation marks needed there.
5. Save the file. That's it.

**One rule to remember:** don't remove or add any quotation marks, colons
(`:`), or dashes (`-`) — those are what keep the file readable by the
website. If you're just replacing the words between the quotes, you're
always safe.

## How to change a photo

1. Find the picture you want to use on your computer. `.webp` or `.jpg`
   files work best.
2. Open the matching `images` folder (e.g. `team/images/photos` for a team
   headshot) and drop your file in — or drag it over an existing one to
   replace it, keeping the same file name.
3. If you added a new file with a new name, open the matching file in the
   `text` folder next to it and update the file name there too (look for a
   line starting with `src:`).

## Adding a new team member or a new publication

- **Team member:** go to `team/text`, open the folder called `members`, copy
  one of the existing files, rename your copy, and edit the details inside.
  Then add their photo to `team/images/photos`.
- **Publication:** go to `publications/text/publications.yml` and follow the
  instructions written at the top of that file.

## If something looks broken

If you're not sure a change will look right, you can always undo it — close
the file without saving, or ask whoever manages the website to check it
before it goes live (see the **Making the change** section in the main
`README.md` one folder up, which explains how changes are safely previewed
before they appear on the real site).

**When in doubt, just ask** — nothing you do in this folder can break the
website itself, only how something looks or reads.
