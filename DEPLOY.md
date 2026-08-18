# S3 배포

빌드 과정이 없습니다. `index.html` 하나와 그 안에서 불러오는 `photos/`, `videos/`,
그리고 픽셀 월드를 그리는 `vendor/pixi.min.js`(PixiJS 7, MIT)가 전부입니다.
번들러도, `npm install`도 필요 없습니다 — 파일 4개를 그대로 올리면 됩니다.

## 1. 버킷 만들기 + 정적 호스팅 켜기

```bash
BUCKET=my-wedding-site        # 전 세계에서 유일한 이름이어야 합니다
REGION=ap-northeast-2         # 서울

aws s3 mb "s3://$BUCKET" --region "$REGION"
aws s3 website "s3://$BUCKET" --index-document index.html
```

## 2. 공개 읽기 허용

```bash
aws s3api put-public-access-block --bucket "$BUCKET" \
  --public-access-block-configuration \
  "BlockPublicAcls=false,IgnorePublicAcls=false,BlockPublicPolicy=false,RestrictPublicBuckets=false"

cat > /tmp/policy.json <<JSON
{ "Version": "2012-10-17", "Statement": [{
    "Sid": "PublicRead", "Effect": "Allow", "Principal": "*",
    "Action": "s3:GetObject", "Resource": "arn:aws:s3:::$BUCKET/*" }] }
JSON

aws s3api put-bucket-policy --bucket "$BUCKET" --policy file:///tmp/policy.json
```

## 3. 올리기

```bash
./deploy.sh "$BUCKET"
```

끝나면 이 주소로 열립니다:
`http://<버킷>.s3-website.ap-northeast-2.amazonaws.com`

이후 수정할 때도 `./deploy.sh <버킷>` 만 다시 실행하면 됩니다. 사진·영상은
바뀐 것만 올라가고, `index.html`은 캐시가 남지 않게 매번 새로 올라갑니다.

## HTTPS가 필요하면

S3 정적 호스팅은 `http`만 지원합니다. `https`나 직접 만든 도메인을 쓰려면
앞에 CloudFront를 두면 됩니다. 안 그래도 한국에서 접속이 훨씬 빨라집니다.

---

# 다른 호스팅 (Vercel / Netlify / GitHub Pages)

빌드가 없는 정적 사이트라 어디든 그대로 올라갑니다. 설정 파일은 이미 넣어뒀습니다.

## Vercel

```bash
npx vercel --prod
```

`vercel.json`이 캐시 헤더를 잡아줍니다 — 사진·영상은 1년, `index.html`은 캐시 안 함.

## Netlify

```bash
npx netlify deploy --prod --dir .
```

`netlify.toml`에 동일한 설정이 들어 있습니다.

## GitHub Pages

저장소 Settings → Pages → Source를 `main` 브랜치 `/ (root)`로 지정하면 끝입니다.
`.nojekyll` 파일을 넣어뒀기 때문에 Jekyll 처리 없이 파일이 그대로 서빙됩니다.

---

# 한글 도메인 (`셀소.com` 같은)

한글 도메인은 DNS에 **퓨니코드(punycode)** 형태로 등록됩니다. 예를 들어
`민소.com`은 실제로는 `xn--h31b13s.com`입니다.

```bash
# 내 한글 도메인의 퓨니코드 확인
python3 -c "print('민소.com'.encode('idna').decode())"
```

1. 도메인 등록기관(가비아 등)에서 한글 도메인 구입
2. 호스팅 쪽에 도메인 추가 — Vercel/Netlify는 **퓨니코드 형태**로 입력
3. DNS에 CNAME 추가 (루트 도메인이면 ALIAS/ANAME 또는 등록기관의 포워딩)

Vercel·Netlify는 HTTPS 인증서를 자동 발급합니다. S3 정적 호스팅만
`http`이므로, 한글 도메인 + HTTPS를 원하면 Vercel이나 Netlify 쪽이 편합니다.
