interface RobotsMetaProps {
  index?: boolean;
  follow?: boolean;
  noarchive?: boolean;
  nosnippet?: boolean;
  noimageindex?: boolean;
  maxSnippet?: number;
  maxImagePreview?: 'none' | 'standard' | 'large';
  maxVideoPreview?: number;
}

export default function RobotsMeta({
  index = true,
  follow = true,
  noarchive = false,
  nosnippet = false,
  noimageindex = false,
  maxSnippet,
  maxImagePreview = 'large',
}: RobotsMetaProps) {
  const robotsDirectives: string[] = [];

  // Basic directives
  robotsDirectives.push(index ? 'index' : 'noindex');
  robotsDirectives.push(follow ? 'follow' : 'nofollow');

  // Additional directives
  if (noarchive) robotsDirectives.push('noarchive');
  if (nosnippet) robotsDirectives.push('nosnippet');
  if (noimageindex) robotsDirectives.push('noimageindex');

  // Max directives
  if (maxSnippet !== undefined) {
    robotsDirectives.push(`max-snippet:${maxSnippet}`);
  }
  if (maxImagePreview) {
    robotsDirectives.push(`max-image-preview:${maxImagePreview}`);
  }

  const content = robotsDirectives.join(', ');

  return <meta name='robots' content={content} />;
}
