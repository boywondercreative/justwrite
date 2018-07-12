import { project } from '../config';

/**
 * Strip paragraph tags and breaks from HTML content.
 *
 * This is a helper function to format HTML content
 * in a way that WordPress expects before sending it
 * back to the API.
 *
 * WordPress stores HTML content with no <p> and <br>
 * tags, and then when it renders the content on the
 * frontent, it has a PHP function wpautop() that renders
 * the <p> and <br> tags based on line breaks (more or less).
 *
 * This function is meant to essentially do the opposite.
 * We take some HTML and replace all of the <p> and <br>
 * tags with line breaks.
 *
 * @param  {String} content HTML content to strip from.
 * @return {String}         Formatted content.
 */
export function unautop(content) {
  // Remove existing double line breaks around <p> tags.
  content = content.replace(/\n\n<p>/g, '<p>');
  content = content.replace(/<\/p>\n\n/g, '</p>');

  // Remove existing single line breaks around <p> tags.
  content = content.replace(/\n<p>/g, '<p>');
  content = content.replace(/<\/p>\n/g, '</p>');

  // Remove opening <p> tags.
  content = content.replace(/<p>/g, '');

  // Replace all closing </p> tags with two lines breaks.
  content = content.replace(/<\/p>/g, '\n\n');

  // For the different <br> formats, remove leading and
  // trailing line breaks, and then replace all of them
  // with a single new-line character.
  ['<br>', '<br/>', '<br />'].forEach(br => {
    content = content.split(br + '\n').join(br);
    content = content.split('\n' + br).join(br);
    content = content.split(br).join('\n');
  });

  // Remove any spacing/line breaks from start and end.
  content = content.replace(/^\s+|\s+$/g, '');

  return content;
}

/**
 * Strip the trailing slash from a URL.
 *
 * This formatting allows us to easily append to a
 * URL, ensuring that it will be formatted without
 * a trailing slash.
 *
 * @param  {String} url URL to strip slash from.
 * @return {String}     URL without trailing slash.
 */
export function stripSlash(url) {
  return url.replace(/\/$/, '');
}

/**
 * Formatted copyright message for application
 * footer.
 */
export function copyright() {
  var year      = new Date().getFullYear(),
      copyright = `&copy; ${year} ${project.title}`,
      version   = `<a href="${project.repo}/releases" target="_blank" rel="noopener noreferrer">${project.version}</a>`, // prettier-ignore
      open      = `<a href="${project.repo}" target="_blank" rel="noopener noreferrer">open source</a>`, // prettier-ignore
      author    = `<a href="${project.authorUrl}" target="_blank" rel="noopener noreferrer">${project.authorName}</a>`; // prettier-ignore

  return `${copyright} ${version} &mdash; An ${open} project by ${author}.`;
}
