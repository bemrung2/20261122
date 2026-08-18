#!/usr/bin/env bash
# Deploy the site to an S3 bucket configured for static website hosting.
#
#   ./deploy.sh my-bucket-name
#
# The page is one self-contained index.html plus the photos and videos it
# loads, so there is nothing to build — this just uploads the files with the
# right content types and cache headers.
set -euo pipefail

BUCKET="${1:?usage: ./deploy.sh <bucket-name>}"
REGION="${AWS_REGION:-ap-northeast-2}"

echo "==> uploading media to s3://$BUCKET"
# Media never changes once uploaded, so let browsers keep it for a year.
aws s3 sync photos "s3://$BUCKET/photos" \
  --region "$REGION" --cache-control "public,max-age=31536000,immutable" --size-only
aws s3 sync videos "s3://$BUCKET/videos" \
  --region "$REGION" --cache-control "public,max-age=31536000,immutable" --size-only

# .mov is often guessed wrong, which stops Safari playing it inline.
echo "==> fixing video content types"
for f in $(find videos -name '*.mov'); do
  aws s3 cp "s3://$BUCKET/$f" "s3://$BUCKET/$f" \
    --region "$REGION" --metadata-directive REPLACE \
    --content-type "video/quicktime" \
    --cache-control "public,max-age=31536000,immutable" >/dev/null
done

# The page itself must never be cached, or edits won't show up.
echo "==> uploading index.html"
aws s3 cp index.html "s3://$BUCKET/index.html" \
  --region "$REGION" \
  --content-type "text/html; charset=utf-8" \
  --cache-control "no-cache, must-revalidate"

echo
echo "done."
echo "website URL: http://$BUCKET.s3-website.$REGION.amazonaws.com"
