/**
 * The exact set of tag filters shown on the Publications page.
 * Anything in a publication's `tags` outside this list is ignored by the
 * filter UI (but still kept on the entry for context).
 *
 * This is a design decision (which filter chips exist), not editable
 * content — to add/rename a chip, edit this list.
 */
export const FILTER_CATEGORIES = [
  'Solar Sails',
  'Laser Propulsion',
  'Nanophotonics',
  '2D Materials',
  'Space Energy',
] as const
