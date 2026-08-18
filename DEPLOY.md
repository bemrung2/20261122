# S3 배포

빌드 과정이 없습니다. `index.html` 하나와 그 안에서 불러오는 `photos/`, `videos/`가 전부입니다.

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
