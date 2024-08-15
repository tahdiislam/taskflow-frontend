/** @format */
"use client";
import Image from "next/image";
import dummyImage from "@/public/flower_1.png";
import Link from "next/link";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useState, useEffect } from "react";
import axios from "axios";
import BlurImage from "@/public/blur.jpg"
import italiana from "@/lib/italiana";

export default function Flowers() {
  const [flowers, setFlowers] = useState(null);
  const [page, setPage] = useState(1);
  const handleLoadFlowers = (pg) => {
    if (pg < 1 || pg > Math.ceil(parseFloat(flowers?.count / 8))) return;
    setPage((prev) => pg);
    axios
      .get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL_PROD}/flower/list/?page=${pg}`
      )
      .then((res) => {
        setFlowers((prev) => res?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (!flowers) handleLoadFlowers(1);
  });
  return (
    <div className="w-full p-4">
      <h1 className={`text-4xl font-bold p-4 ${italiana.className}`}>All Flowers</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 ">
        {flowers?.results?.map((flower) => (
          <div
            key={flower?.id}
            className="max-w-[350px] space-y-4 rounded-lg bg-white p-6 shadow-lg md:w-[350px] dark:bg-[#18181B] mx-auto"
          >
            <picture className="rounded-lg overflow-hidden block">
              <Image
                width={200}
                height={200}
                className="h-[275px] w-[350px] rounded-lg object-cover hover:scale-110 ease-linear duration-200"
                src={flower?.image || BlurImage}
                alt={flower?.title}
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,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lZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4eLj5OXm5+jp6vHy8/T19vf4+fr/xAAfAQADAQEBAQEBAQEBAAAAAAAAAQIDBAUGBwgJCgv/xAC1EQACAQIEBAMEBwUEBAABAncAAQIDEQQFITEGEkFRB2FxEyIygQgUQpGhscEJIzNS8BVictEKFiQ04SXxFxgZGiYnKCkqNTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqCg4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2dri4+Tl5ufo6ery8/T19vf4+fr/2gAMAwEAAhEDEQA/APd6KKKgAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiikpAGaSijNABRmkozSuAuaM03NGaVwHUU3NLTuAtLmkzRTAdRSZpaACiiimAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRSAKKKKACikooAKSikpABozSZpCaTYC0maaTSZqWwHZozTM0ZpcwEmaM1HmlBppgSZpRTAaUGquA+ikFLmncBc0tNopgOopKKAFpKSigBc0ZpKM0ALmjNJmjNIBc0ZpM0UwFpabS0ALRSUtABRRRTAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACikozSAWkpKKQC5ozSZozRcBc0ZpM0ZouAUUmaTNFwFpKTNITUtgBNNJoJphNS2ApNNJppamFqychEm6k3VEWo3VPMBNupQ1QbqcGqlICcGng1AGp4atFIZMDS5qIGng1VwH5pc0zNGaq4D80ZpmaM0XAdmjNNzSZouA7NGaZmjdSuA/NGaZmjNFwH5paZmjNFwH5paaDRmncB1Lmm0tMB1FJS0wCiiimAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFJmkAUUlFABRSE0maVwHZpKTNJmpbGOzSZpM0ZqeYBc0ZpM0maXMAtGabmmk0+YBxNNJppNMLUmxDiajZqazVGzVlKQh7NTC1Rs1MZqylICQtSbqhL03fUcwFgNTg9VQ9OD1SkBcVqerVUV6lVq0UhloNTw1VlanhqtSAnzS7qhDUu6qUgJd1G6ot1IWquYCXdSbqiL00vS5gJt1JuqHfSb6TkBPuo3VBvpQ1TzgThqcGqANTg1CmBODSg1EDTgatSAlBpaYDThWiYDqUU0UtUA6ikFLTAKKKKYBRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFJSAKSikJpALmmk0E00mk2AuaM00mkJqHIY7NJmm5pM1m5DH5pM03NJms3IY/NITTCaaWo5wsPJppamFqYz0+YQ4tTGao2eo2ek5EkjPUTPUbPUbPWcpCJGeo2eo2emFqwlIRIXpu+oi1NLVHMBPvpwequ73pwempgXFepVeqKvUqvVqYy8r1IHqkr1IHq1MZb30b6rb6PMq1MCzvppeq5ekL1XOBOXpC9Vy9NL0c4FgvRvqtvpN9Q5gWt9OD1UD04PUc4FsNT1aqqtUitTUwLStUgNVlapFNbRkBYBp4NQqaeDW8WBKKUUwGnCtUwHUoptLVXAdRSUUALRRRTAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKQ0gA0lFITSACaaTSmmk1LYATTSaQmmk1m5DFJpCaaTTSaylIY/NJmmbqTNZSkMfmgtUe6kLVk5jHlqYWphao2elzgPZ6jZ6jZ6hd6amIkZ6jZ6haSo2ejnJZKz0wvURem7qhyJJC1MLU0mkzWTYhSaaWpDTTUNgO3UBqjJpM0cwFhXqRXqoHpwempDLwkp4kqiJKcJKpTGXfMo8yqfmUeZVKYFvzKQyVV8yl31XOBYL0heoN9Juo5wJ99G+oc0ZqXMZOGp6tVcGnqajmCxZVqlVqqqalQ1SkBbVqlU1VQ1MprohIRZU1IpqupqVTXTGQE4NOBqEGng1smBLmlzUYNOzVpgPzRTc0oNVcB2aWm0opgLRRRTAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigBDSUUGkAGmmg00mpbACaYTQTUbGs2wFJphNNZqjZqwlIY8tTS1RlqaWrCUikSlqTdURakLVjKQyUtTS1RF6Yz1m5DJGeonemM9QO9TzAPd6geSmO9QPJTUiWStJUZeoWem7qfMSyfdS5qENT1NFxEmaWminCpYhDTTTyKaRUsRGajJqRqiapYBuo31GxphapuBPvpfMqrvpPMp3GXPMpfMql5lPD01IZbD04NVVXqVWp8wywGpwNQqalWnzDsOFOFIBTgKVx2FFPWkApwFK4WHrUimowKkUVSYWJVNTKagWpFNbRkIsKakU1XU1IGrpjIROGp4NVw1PDVvGQicNTwarhqeGrVSAnBpwqIGng1omA+lpopRVIBwpabTqYBRRRTAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKQ0GkpAFIaCaQmpbAQmmE0pNRsahsBGNRM1K7VC7VhKQAzVEzU13qJnrnlIY8vTS9Ql6YXrnlIZOXpC9Qb6QvWTkUTF6Yz1CXpjPWbkMe71A8lNd6gd6VxDneoGemu9Qs1NMRKXo3VBupwNWmSWFNSqarqalQ1VxFhaeKjU1IDQIWmtTqRqlgRNUD1O1QPUsRC5qF2qV6ruahgIWphemMaYWpDJw9PVqqhqkRqYy4jVYQ1TjNWYzTuUi0lTKKgjqwlFyrEiinhaRBUqii47CBacFpwFPAphYaFpwFOApcUwsApwptLmrTJaHg04NUWaN1bRkSycNTg1Vt1ODVtGYi0Gp6tVZWqRWreMhFpTUgNV1NSqa3iwJgacKYtPFaIY4UopBSirAWiiimAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABSGg0lIApDQaQ0mAGmMaUmmMahsBGNRO1KzVC7VjKQDXaoHalkeq0j1zzkAO9QM9Nd6gd65pSAlZ6YXqBnpu+sGxlgvSb6h3UbqzbKJS1Rs1NJpjGpAR2qB2pzmoXNADXaomahzUZNUhDw1PVqr5p6tVIRaQ1MhqorVKjVSEXEapQaqI9TK1MCfNBNRhqUmkxCNUL1KTUT1LEV5KrSVZeq0lSwK71ETUr1CetIYoNSoahqRKRSLUZq1GapRmrUZouUi7GasIaqRmrCGlcstoalWq6NUytTuMmWniolNPDU7gPopM0maYh2aaTTS1MLVVyWPLUm6oi1NLVSZLJt1ODVX3U9WraLJLStUyGqiGrCGumDEWkNTKarpU6V0xYEy1IKjWpBWyGOFLSClq0A6iiiqAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACkpaSkAlBoNNNIANNJoJphNS2AE1GzUM1RO1YyYCO1V5GpztVaR6wnIQ2R6qyPTpHqrI9cs5AJI9QO9NkeoWaueUgJC9G6oN1OU1ncZMDTgajWpBQMWmtT8UhFIZA9QPVlxUDigCs9RNU0lQPTQhuaA1RsaTdVIRZVqlV6pq1SK9UBeRqmRqoo9To1Ai4rU7NV1apFNICQmmNS0jUmIgcVXkFWmFQutICm61Cwq261Cy0hkOKetG2nAVLKRJHVhDVdamQ1LLRbjap0aqaGplakUXFapkeqatUivQMuh6eHqmr08PVIC1voL1W8ykMlUgLBeo2eoTJUZeqJZOXpu6oN9G+qRJYDVIhqsrVMhraJJajNWY+1VY6tR10QEWY6sJVeOrCV1RAlWpRUa1IK3QDhS0gpatALS0gpaYBRRRTAKKKKACiiigAooooAKKKKACiiigAooooAQ0lFBpAIaaTSmmMahsBCajY0rGoXas5MQjtULtSu1V5GrnlIBJHqrI9Okeqsj1zTkIbK9VJHp8j1VkauaUgGu1RFqRmpmaybAkBqRKhU1KlAydKlUVGgqZBQUOApCKkAoIoGV3FQSCrTCoJBSEUpBVWSrsoqnLTQiuxqItT5KgY81SAkDVIr1V3U9WqhF5HqdHqgj1YjakIvo1TKaqRtVhDSbAnFLikWngUgIyKidaskUxloGUnWomWrrJULLQMqFaMVOVpu2pZSGqKkWkAp4FSykOWpFNMUU8CpKJAaeGqIUuaBkwenB6r5o3UwLPmUhkqtvpC9UhFgvTC9QF6N1WhMm3U5TUINSJWiRJYQ1YjqvHVmOtooksxVajqtGKtR1vERZjqdagSplroiBOtPFRrTxW6AeKdTRSitEA4UtNpRTAWiiimAUUUUAFFFFABRRRQAUUUUAFFFFABSGlpDSASkNKaaaTAQ1GxpzVGxrNsBjmoHNSOagc1hJiI5GqtI1SSGqsjVzTkIjkaqsjVLIaqyNXLOQEUjVWdqkkNV3NYNgNY0gNIaQVIEqVPHUCVPHVIZYSp0qBKmU0FEooNNBoJpDGtUElTMagkoEVpapyirklVZBVIRSlqs9W5BVZxVIRCTQDSsKbVCJ0NWY2qmpqeNqlgX42q3GaoRGrkRqGwLaVMoqCM1YSlcYuKQrUgoxRcZXZahZKtMKjZaoZVZaYVqwy0m2kUQhacFqULTglSUiMLS7amCUuykUQ4pMVOUppWpAhNNNSFaYwoAjJppNOYUw1SEGacDTacorVEsetToKiQVYjFaoRNGKsxioYxVhK0QixHViOq6VOhraLEWUNSoarqalVq3iwLCmpFNQK1SKa2ixEwNOBqNTTga1TAkFFNBpwqgFFLTaWmAtFFFMAooooAKKKKACiiigAooooAKSikpABpppTTTUsBjVExqRqiY1lJgROaryGpnNVpDXPNiIZDVWQ1PIarSGuWbAryHrVaQ1PJVaSuWQiCQ1XY1NJUDVkwGGlFNNANCAmQ1MhqshqZWqhltDUqmqivUgegoshqC1QB6C9ICRmqJjSF6YzU0IZJVeQVOxqFqpAVZBVd1q44qu4q0SVHFREVYkFQmgBB1qeM1X71IhqGBeiNXImrOiarkLVmwNCM1ZQ1SiarKNSGWhS1GrUuaZQpqNqcTTSaYxhFJinUCgpCBakVaVRUqikykNCUu2pQtLtqWUQlajZatFaiYVLYFVlqNlq0y1CwpXArMKYRU7CoiKpMkZinKKMU5a1iyWSIKnjFQpVhK2TETpU6VAlSqatMRYU1KpquGpwatExFpWqRWqoHqRXraMgLitUqtVNXqZGreMhFtWqQGqytUqmtVICcGnColNPBrRMB9KKaKWqAdRSClpgFFFFMAooooAKKKKACiiigBDSUppDSAaaaac1MNQwGNULmpGNQuaykBE5qtIamc1XkNc02BBIetVpDU8hqtIa5piIJKrSVYc1XkrnkBXeoGqd6ges2gIjSZpWpmaLASA08NUGaUNQBaV6cHqqGpd9AFrfRvqtvo30WGWd9JuqENS7qpICQmmNSZpCapIQxqgkqdjUEhqhFaSoHqeQ1Wc0mIaTzTlaoWahWqGBdjarcT1mxvVqJ6zYzUierSPWZHJVlJKkZoK9OD1TWTiniSmUizupC1V/Mo31RROGp4NVlepFagpFpKmWqyNU6GpZSJxTsUxTTs1DGIaYwp5NMY1LGRMKhcVM1RPSAgcVE1SvULGqRLG0oNMJoDVrFksnU1OjVVVqlRq1TJLiNUqtVRWqUNVpiLAanBqr7qXfVJiLAepFeqganq1aRkIuo9To1UUarEbVtGQi8jVMhqnG1WENbxkMtKakBqBDUqmtosCQU4UwU6tEwHClptOqkAUUUVQBRRRQAUUUUAFFFIaAEoNFIaTAaajY081G5rNgRuagc1K54qvIaykBFIarSGpZDVaRq5pgRyGq0hqSRqru1c0hEbmoJDUjtULmsGBE9QtUrVG1SBC1MNSsKYVosBHSZpxFNIosAZpc03FGKLAO3Uoam4pwFUkMeDThTQKeBVJALQaMUhp2EMc1XkNTvVaQ0WEV5TVWRqnlNVJWosIYzU0PzUbtio91Q0BcR6sxyVmq9TxyVm0M1o5KsJJWVHJVhJKmwzTWWnCSqCyU4SUWGXvMpfMqj5lKJKqxSNBZKlR6zlkqZJKLFI043qwj1mxyVYSSpaKTNBXp4aqSyVKHrNjLG6mk1FvpC9Qxj2NQuaVmqJmpAMc1Cxp7moHNUhMRjzTQ1NY0zNaollhWqVGqorVKjVaZJcVqkDVVVqlU1VyScNS7qiBpc0cwiUNT1aoAaepqlIRaRqsxtVJDViM1tGQF6NqtRmqMZq1Ga3jIC2hqZTVdDUyGumLGTCn1GtPHSt4sB1LSClFaIBaKKKYBRRRTAKKKKACkNLTaAA000pppqWA01E5p7VE5rNgROaryGpZDVaQ1jICGRqqyNUsrVVkauabAjkaqztT5Gqu7VzSEIzVGxpGamk1kwA00ilopAMIphWpsUbaYFcrTSlWtlJspDKuyjbVny6Xy6B2KwSnhKsCOnCOrQ7EASnBasCOneXTFYrbaYy1aKVG60wsUpBVWWr8i1TmWgkoS1Tlq9MKpSimIqOahLYqWQVA1JoB6tUqPVXPNPVqyaAvxyVOklZ6NU6NU2AvrJThJVRWp4ahIdy1vpQ9VgaUNVWHctrJUySVQDVIr4osUmaaS1YSWslJKnSWpaKTNZJalWWspZfeplm96zaHc0hJR5lURLTxJWbRVy0XpjNUO+kL0rAOdqhc0rNUTGmhCMabmgmkq0SxympUqJamQVVxEyGplqFBU6ii5I4U4UAU4Ci4CCnrTcU4UJiJUNTxmq61PHWsZCLcZq1GapxmrMZrogxlyM1YQ1VjNWEPFdcGBOtSLUSmpB1rpiwHilFNpwrVALRRRVAFFFFMAooooAQ0lKaQ0gENMY040xjUsCNjULmpHNQOazkwIpDVWVqmkaqkrVhJgQStVSVqmlaqkrVyzYiKRqgdqdI1QMa55MAJpM00mgVAEgpwFMWpVFIYoWnBacoqQLSuOxFso2VOFpwSlcqxXEftThHVgJT1jouOxWEdPEdWRHTxHVphYqiOl8urfl0GOquBRZKhkStBkqCRKLiMyVKpzLWpKlUpkouSzKmWqMy1qzJVGZKpMkzJVqq4rQlSqki0CKxpVNOZaQCpYiRDU6GoEFWEFTYRMlSimRrU6rTSAaBS1IFoK1SQyKjdinMKiaixSJRJT1lqoTijfUtFJmgstTLL71lrJUqy1m0Umaiy1KstZiS1MklZtFXNASU7fVJXqUNU2GTlqaTTAacKdhBSgUoFPVaBAq1Mi0irU6LQSKi1Oi0iLUyrSEIFp22nhaXFAEWKXFPIpMUxAtSpUYqRa0iBYjNWozVRKsxmuiDAuRmrCGqsZqwhrrgwLCmpRUKmpVrqiBJSiminCtkA6ikFLVoAooopgFFFFACGmmlpDSYDTUbGnmomqGBG5qvIamc1WkNYyYFeU1UlarEpqlKa55sRBK1U5WqeVqqSGuaTAidqhY05zURNYNgOzSrTM09akZKlTJUSVMlAyVRUqimIKnUVLKSBVqQLSqKkUVBQ0JTwlPUVIFppjI1SpAlPC08LVJgRbKQpU+KQiquBVZaryLV1hVeQUXJKEq1SmWtKUVTlWi5JmTJVGZOtasq1SmSmmSZMyVUkStWVKpyJVXEZzrTQtWnSmbKCSNFqxGtNRasRrUkkka1YRKbGtWUWmhjAlIyVZCUjJVIZSdagdavutVpEqiik9Qk4qzItQMtA0MDU9XqMigVDRRaR6nR6pLU8ZrNoZeRqmQ1UjNWo6mwywtSoKjjFWY1qbACrUqLSolTolIQ1UqZFpVWpVWkIVVqVRSKKeBUgKBRiloNMBpFNNPNNNNCEp60ynitEBMlWI6rJViOt4AW4zViM1VjNWENdUALKVMtQIalU11wAlWnCmLTxWyEOpabSirAWiiiqAKQ0tIaQCU004000mAw1E1StUT1nICB6rSmrElVZawmxFWU1SmPWrcpqlNXLNgVJTVSQ1ZlqpJXNJgQuajJpz1GTWTYDgakQ1CDUimgosJVhKqoasIaBospU6VXQ1YSpZaJkFSqKjSpkqRj1FSKKatSCgYqinAUgp1UgCmtSk0wmmIY9V5Kmc1A5ouSV5BVWVatPUDilcllGRaqypWg61XdKaYjMljqpJHWtJHVWWOquSZTx1EUrQkjqBkp3JKyrU8a0BalQUhEsYqwgqKMVYjFMB4WgrT1pSKaZSKzrVeRKvstQulVcpIzZI6rOlabx1C0XtTuVYzWSk2VeMNNMVK4yqq1Mi1II6kSOoYCxrVqJaYiVaiSoYEsS1ajWo4lq1GtSIci1Mi0qLUqrSAQLTgKcBS4qWACnCm0ZqQH0mabmkJoAcaaaTNGapCFpwpmacK0QEy1YQ1WU1Oh6VvERajNWENVYzViM10wYFpDUymqyGp1NdUGBMKeKjWnit0A8UtNFLWiAdRSCimAtIaWkNACGmmnGmmpYEbVE9StUT1nICCTvVWWrMlVZa55iKctUpquy96py965JsClLVOSrkoqpIK5pCKz1EaleomqBiA09TUWaUGmNFpGqwjVSVqmRqZSL8bVZjas+N6sxtUtFIvoamQ1TRqsI1TYosqakBqurVIGpDJs0u6od1IXpgSlqYzVGXqJnpiHs1Qs1NZ6jLUiRWNRNTiaSgkiZajZKsYppWgRSdKrSR1pOlV5EqriMuWOqzpWlKtVJFp3EymVxSinsKbQIkSrCGqqmp0amBaU08VCjVKpplJC4ppWpQKULRcpIqtHUZiq9so8v2ouXYzjD7U0w+1aRippi9qLhYzhDThFV7yqPKpNiKyR1ZjSniOpEXFQxDo1qzGKjRanSkIkUVIBTFp4NIB1IaM00mkwFzSE0hNNJqGA7NJmkzRSELmikoqkAtPBqOnA1qhEympkNV1NSoea2iBbQ1YQ1UjNWIzXRBgW0NToaqoasIa6YMCdTUi1EtSCuiLAkFLTRThWqAUUUCimAtJS02mAGmmnGmmpYEbVE1SmoWrKQEElVZKtPVaSueYinLVOUdauyiqkorkmIoyiqsgq7KKqyCsGhFJxUDirci1XcVNhkBpM05hUTU7DJA1So9Vc09WxTsNMvxvVmN6zUerMb0rFpmnG9WEes6N6sI9S0Vcvq9PD1TV6fvqbDuWd9NMlVzJUbSUBcsNJUTSVA0lRNJQTcsGSk31VMlAekItBqcDVdWqVTQImFLimqadmkIYwqvIKssagkp3ApSrVOUVelqlNTuIpyVCxqaU9arMaaEPDVKjVVDVIjVQF5GqwhqlEatxmgtIspUyrUUdWUFS2WkIEp4jqVFqVUpXKsVvLpDHVwJS7KLhYomKmmOrxjphSmIqbKULU5SmlaRI1RUi02lFIkkBp2aizS7qLAS7qaTTN1JupNAPzSZpuaUVmwFp1IKeBRYQmKKeBRtq0gGYpRTttG2tUhAtTJUYFSKK1ihE8dWI6roKsR1vFAWY6sJVdO1WEroiMmWpVqJalFdEQHinCminCtUAtFAoqgFptOptNgBpppxppqWBGaiepTUbVlICu9VpBVpxUEgrCSEUpBVaQVdkWq8i1zSiIoSLVaRa0HSq0iVk4iM+RarSLWjIlVpE9qOUDPdagYVdkSq7rRygVjSqacy03FHKNEiGrEbVWUVOlLlKTLkbVYRqpxmp0NS4lXLSvS76gBpc1DQ7kpeo2kpjNUTNU2C45nqMvTGaoyaVhXJt9OV6rA09TSsIto1TI1U1NTI1IC4rU8NVZWp++pAkY1E5oZ6gkegCOU1SmPWrEr1SmancCtKaqueallbmqzmqQhQakQ1XBqWM1aGi7Eauw1Qhq/DQy0XYqtxiqsNXIqhlInRamVaYgqZBUlChaXbTwKdigCErTGSrJFMZapCZUZajZatMtRMtVYllcimmpWWoyKrlIY3NGaCKaaOUQuaM02lFS4gOFPWmKKlUVHKA9RUqimoKmVaaiAgWl21IFp+ytIwAr7aNtWNlGytlARCFp6rUgSnqlaKAhEWrCCmotTotaxiA9BU6Co0FTIK2jEZIoqQU1RTxW8UA4U4Ugpa0QCiigUUwFpKWkNMBDTTTjTTSYDGqNhUzCo2FZtAV3FQuKtMKiZaykhFN1qB1q6y1EyVi4iKLpVd0rQdKhdKnkAzZI6rSR1qPHVeSOlyAZMkdV3jrVkiqu8VPkAy2jpmz2rQaKmGKlyAVAlSKtTiKnrHScBkaLUyilVKeFrNxGIKDT9tIRWTiMiao2qZhUbLUOIEDUw1My0wrS5REVOFLijFJxAepqVWqAGnbqhoCyHpd9Vt9IZKhoCw0lQvJULSVC8lSA6WSqkr0SSVVlkpoY2Rqrs1K71CW5q0BIDzU0fWqynmrER5qxovQ9qvQ1Qhq/DSZaL8NXIqpQmrkRqGUW0qdaroanQ1IyZaeKjU1IDTSAXFNIpwoxWiQmQsKjZaskUxlraMSGVGWomWrjJTClaqBLKZWmlatlPamFKrkJKu2lC1OUpNlQ4ARqtSotKEqVFqOQYqLU6LSItTotNQAFWnhKeq1IFrWMAIdlLsqwEpdlbKAiuEpwSpwlOCVagBEqVKq09Vp6rVqIAq1KopFWpAK0UQFAp4pAKcK0SAUUUUoqgFooopgFIaWigBtIacaSkA00wipDTTSaAiIpjLUxFNIqGhFdlqNlqyVppWocQKbJUTJV0pTGSlygZ7x1C8daLR1E0dHKBlvFUDxe1arRVE0VHKIymh9qjMPtWo0VRtFS5Rmb5XtS+XV4xU0x1LiBU2UbaslKaVrNxGQbaaRUxFMNZOAEJFMYVMaYahxAgK0wrUxqNqXKBERTTT2qNjUuACE00tSM1RM1ZuIDy9MaSoWeoXkrNxAneWoHlqF5KrvJ71HKBLJLVd5KjeSoHkpqIEjPTd1Ql6A2apRGWkNWYjVKNqtRGqsNGhCelXoTWdCauwtUtFo0YjVuM1nxNVqN6loaNBGqdGqgj1Or0rDLqtUitVRHqVXq1EC0DTqgVqlU1rGImPxSbaUU8CuiMSGRFaaUqzto2VvGBJUMdNMdXClIY6rkEUTHSeXV0x00x0nACqEp6pU+ynBKjkAYi1Oi0KlTItNQAFWpFWlValVa0UAGBacFqQLTgtaKIEYSlC1KFpQtUogRhaeFpwFOAqrANAp4FAFOAp2AQCnCjFFVYAp1JS0wCiiimAUUUUAFJS0UgG0mKdSUANxTSKfSYpWAYVppWpcUmKVgIStMK1ORSEUrAVmSo2SrZWmlaLCKTR1G0dXitMKUrAUGjqNo6vslRMlFgKLR1EyVddKgcVLiMpstRMKsSVWkqHECJjUbGldqgZqhwAcTTC1Rs9MZ6jkAezVGzUxpKiaSlyAPZqhdqY8lQvJUuAD3eoHeo3kqB5KhwAkeSq7yVG8lV3krNwESvLVd5KjeSoHk96j2YEryVC0lRNJUZen7MCffTlaqoepEanyDL0bVbiNZ0bVbiahwKRpwtVyJqzIn6VbjeocSkaUb1ZR6zUep0kqeQZpJJUySVmrJUyS01AdzSSSpkkrNSSp0krSMBXNJHqdGrOjkqzG9bRgK5eQ1MtVY2qwhraMCSZRUgWmpUqitlEQ3bRsqYLS7aqwisY6QpVrZTdtHKBW2UoSrGyjZU8oEKpUqrTgtPC01EBFWpAKVVp4FUkAgFOApQKcBVJAJilxS4pcVVgGgUuKdiiiwCYpaKXFMBKWlooAKKKKYBRRRQAUUUUAFFFFABSYpaKAG0U6kpAJikxTsUlFgG4pCKfikxRYBhFIRUmKQiiwERWmFanIppFKwFdlqJlqywqJxRYCpIKrSCrkgqrKKLAUZapymrk1UZqVgK0rVVd6llNVJGqeUAZ6iaSo3aoXelygStJUTS1Cz1C8lTygTPLUDy1C8lQu9S4gSvJVd5KjeSoHepcRD3kqB5KY71C71DgA95KgZ6azVEzUvZiHs9ML1GzUwtVKmBOGqRGqqGqRGo9mMvRtVuJqzo2q1G9S4FI0o3q1G9Zsb1YR6zcBmkklSrJWej1KslLkHc0FkqVZazlkqVJKagO5pJJVmOSstHqzG9aKArmpFJVyJ6yonq7C1aqArmnE1XIjWbC1XomrRREXozVhKqxGrUdWkIlUU8CmrUgFOwCYpNtSAUuKLARbaNtSYpcUWAiC04LT8UoFFgEApwFAFOAp2AAKWilpgGKKUUUAGKMUtFMAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigBMUUtFADaKWigBpFNIp9IaAI2FQuKnao3FAFWQVUlFXpBVWVaAM2YVQnHWtSZaoTJRYDLmFUpRWnMlUpUosIzpBVd6vyR1VkjpWApuahc1adKgdKTQFRzULmrLrUDrUMCs5qFzVh1qFxUAV3qFjU7ioXFICBjUTGpXFQtVJCGM1NJoamE1aiA8GpEaq4NSKafKMto1WY2qihqwhqHEZfjap0eqKNVhGrNxGXFepVaqimplNTyjuWlapUaqyVPGKpRAtRmrURqrGKtRCrURFyI1dhNUoRV6EdKtIC9Cavw1QhFX4aqwi7Eatx1Uiq3HTsBYSpVqNKlWgBwFLigU7FADcUYp2KMUANxS4p2KMUAJilxRRQAUtGKWmAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUANoNKaSgBpqNhUpphFAFdxVeRauMKgdaAM+VKpypWpIlVpI6YGRLFVOWKtmSL2qtJF7UCMWSGq0kNbUkPtVeSH2pAYkkNV5Iq2pIfaqskPtUNgY0kVV5I615IqrSRVlJgZLx1A8dackVV5I6ycgMx0qCRK0pI6qyJihSAz5Fqs4q/ItVZFraLApsKjapnFQtW0RCU4UynCqGToasIarJVhKzYFmM1YSq8YqzGKybGTJViMVFGtWo1qbgSRrVmNabElW4o81SAdGlWokoijq5FH7VogFiSrkSUkUdW4o6tAPhWrsK1FElXIlpgTRCrcYqCNasoKAJUFTLUaCpVoAcKcKQUtABRRS0AJS4paKAExS0UUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAU2nUhoAQ00inUhoAjYVEy1ORTSKAKrrUDpV1lqNloAz3jqB4q0mSoWSgDMeKqzxVqvHUEkdS2BkyRe1VJYq15I6qSpWcmIyJYqqSR1rSpVSVKwkwMqSOqsiVpyJVWRawcgMyRKqypWlKtVJVoUgMyVapyr1rSmXrVGYV0QYFCQVXYc1blFVnFdMWBFTlpMU5RVtgSxirMYqCMVZjFZSYFiMVajFQRCrkS1zykBNEtW4kqKJauwr0qeYCWFKuwx1HCnSr8KdKuMgHxR9KuRR0kMdXYo62TASOOrccdLHHVmNK0QxI46sxpRGlWEWmAqLU6CmqtSqKYDlFSCmgU8UAKKWkFLQAopaSloAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACkpaQ0AJRRRQAlNIp5pDQBGRTCKlNNIoAhK1E61YYVGwpAVXWoJFq24qvJUsCjKtVJVq/LVKasZMRQlHWqcoq9NVOWuebAoyiqkoq7LVSUVztgU5RVKYVflqnMOtOLAz5h1qhMOtaM1UZhXTAChKOtVnFW5R1qswrqiwIMU9RS4pyiqbGSRirUQqCMVaiFYzYixEKuRCq0Qq5CK5pMC1CtXYV6VVhFXoRWfMIuQLV+BaqQCtCAVrFgWoVq9ElVoRV6EV0RYyaNasotRxirKCtUxiotTqKaoqVRVoBVFSAU0CnimAopwpBSigBRS0lLmgApaSigBc0tNooAdRSZpaACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACikozQAtJmkooAXNJRRQAUUZpKAA0UUlABTTSmmk0ANaomqRjUTGpYEb1WkNTyGqshqGwK8pqlMasymqcp61hJiKsxqnKasymqcprmmwK8pqrJViSq0hrBsCrLVObvVySqcveriBSmqjNV+aqMtdMAKUg61XYVakHWoGFdMRkOOaeopcc04CqbAfGKtRCoIxVqMVjMCxEKuRCq0Qq5EOlcsxFqIdKvQ1TiFXYayuBegq/BVCGr0FaRYjQhq9FVCE1ehNdMWMux1ZSqsRqyhreLAnWpFqJTUimtEMkFOFMBpwNMB1LTQaXNMB1LTc0ZoAdRmkozQA6ikooAWiiigBc0tNpaAFooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAoopM0ALSZpKKACiijNABRmkpM0ALRSZpM0ALmjNJmkzQAuaQmkzSE0AKTTSaQmmk0gEY1ExpzGoXapYDJGqrK1Su1VZWrOTAglaqcpqxK1U5TXNNiK0pqpIasSmqshrlkwIJDVaSp3qvIazAryVUlq1JVWWtoAU5e9U5auy9KpyjmumAynIKgYVacVAwrdAR4pyilxTlFNsY9BVqIVAgqzEKykBYiFXIh0qtEKtxCuaYi1EKuRVUiFW4qwYi5D2q9CaoxVchNVFgaEJq7Eaz4jVyI10wYGhGasoapRmrKNXRFjLSmpVNVlNSqa1QE4NKDUQNOBqwJc0uajBpQaYD80uaYDS5oAfmlzTM0oNAD6M03NLmgB1Lmm0tAC0UlLQAtLTaWgBaKKKACiiigAooooAKKKKACiiigAooooAKKKKACiikNABSUUUAFGaSjNABSZopM0ALmkzSZpCaAFzSZppNITQA7NITTSaQmgBxNNJppNNJpAOJprGmk0xmpADNULtSs1RO1Q2BHI1VpWqWRqqyGsZMCGU1TlNWJTVSQ1yzkIgkNVZDViQ1Wc1zSYED1Xep3qB6EBXkqrLVmSq0ldEEBUlqrIOatyd6quK6IjKriomFWHFREVqBFinKKXFPApNjHIKsxjpUKCrEYqJAWIhVuIVWjFW4u1c8xFmLtVuOqsVW4655AWYqtxVUjq1HSTEXIjVyI1RjNWozXRBgXo2qyjVSjarKGuqLGW0apVNVlapVNbJgThqeDUANPBrRDJQacDUQNKDTAlBpQajBpQaBEgNOzUYNKDTAkBpQaYDSg0APBpaaDSg0AOFLTaXNADqKSloAWlptLQAtFFFABRRRQAUUUUAFFFFABRRRQAUUUhoADSUUUAFJRSGgAJpM0GkJoACaQmkJpCaAAmkJpCaaTQA4mmk0hNNJoAcTTSaaTTSaQDiaaWpCaYWpDHFqjZqC1RsaTYAzVC7UrGonNZyYEbmq8hqVzVeQ1zTYiCQ1VkNWJDVaQ1yTYFeQ1Xep3qu9Y3AgeoHqZ6geriIgeq8lWHqvJXVBAVZKrOKtuKruK3QyswqMirDLUZFVcCLbSgU7bTgKm4xUFToOaiWpkFJgWIxVqKq0dWY6xkBbiq1HVWOrUdc0hFmOrMdVY6sxmoTAtRmrMZqpGasRmtoMC5GasoapoasIa6oMC0hqZTVVDUymuiLGWAacDUCmng1ogJgacDUINOBqgJgaUGogaeDTAkBpwNRA04GgCQGnA1GDTgaYiQGlBpgNOBoAeKUUwU4UAOFLTacKAFopKWgBaWm0ooAWiiigAooooAKKKKACiiigApKDSUAFBopKAA000tNNAAaaTSmmk0AITTSaUmmE0AKTTSaCaaTQAE00mgmmk0hgTTSaQmmk0gAmmk0hNMJoAUmmMaCajJqGwBjULmnMaiY1jJgMc1Xc1K5qCQ1yzYEMhqtIankNVpDXLJiIJDVdzU8lV3qAIXNQPUzmoXraAiF6gep2qFxXTECu4qFxVhhmo2WtbjKzLTCvtVgrTCtJsZBtpQtSlaTFTcBqipUFIBT1FO4EqVZjqqlWYzWcgLcZqzGaqRmrMZrnkBbQ1YQ1VjNWENZAWUNWENVUNToauLEW0NToaqIanQ11QYy2jVKpqshqVTXTFgWAaeDUANSA1qhkwNOBqEGng1YEoNOBqIGnA0wJgacDUINPBoESg04GowacDTAkBpwNRg04GgRIDThUYpwpgPFOpgpwoAdQKSloAWigUUAKKWkFLQAUUUUAFFFFABRRRQAhpKKKAA0hopDQAhpppxppoAaaaacaYaAENNNKaaaAENNJpTTTQMQmmE0ppppDEJphNKaYTSAQmmE0rGmE0gEJpjGlJqMmoYCMaiY09jUTGsJCGOagc1KxqFzXLMCCQ1WkNWJKrSVzyAgkqu5qd6rvUpCInqFqlaomreCERNUTCpmphFdEQICKaRUxFIVqmxlcrTStWCtIUrNyGVitJtqwUppWp5gIdtKBUm2kxVJgC1MlRgU9aGBajNWIzVRDVhDWEkBcjNWENU0NWENZNAWkNToaqoamQ1UQLaGp0bpVRDUyGuiAFtGqZTVVDUymumIFkGng1ApqRTWyGTA04GogacDVoCYGng1Cpp4NUBKDTgajBpwNAEoNPBqIGng0CJAaeKjFOFMCQU4UwU4UxDxThTBThQA4U4U0UooAUUtJS0AFKKSlFAC0UUUAFFFFABSUtIaAEoooNACUlLSUANNNNONNNADTTTTjTDQAhpppxppoGMNNNONNNIBhpppxphpDGmmGnmmGgBjVGae1RtSAaTUZNPNRmoYDTUbU9qjasZARtUD1M1QvXPJCIJKryVYeoHFYOIFZ6gerDioHFJREQNUTVMwqMitYoCFhTcVIRSYrRAR4o21LtpQtJsCHZSFasbaTbWTZRWK00rVorTClSmBWK00rVkrTCtaJgQYpwFPK0gFUA9anQ1AtSpUSQFlDVhDVVKsIazcQLKGpkNV0qdKqMQLCGpkNV0qdK3igLCGplNV0qVTW8QLANSKahU1IprVASg08GogaeKsCUGng1EKeppgSg08VGKeKYDxUimohT1oESinCmCnimA8U4UwU8UCHinCmCnCmA6nU0UooAdSikFAoAWlFJRQA6iiigAooooAKQ0tFADaKKKAEpKWkoAaaaacaaaAGmmmnGmmgBppppxppoGNNMNPNNNIBhphp5pppDIzTDUhphpARNTGqRqY1AERqNqlao2qWBG1RtUrVGwrNoCFqicVOwqJhWTiBXcVA4qy4qF1rNwEVXFQOKtutQstTygVWFRMtWWWomWqUREBFGKkK0baGMjC04LTwKcBWcgI9tG2pcUhFZMoiK00rUxFNIpICuy0xlqwRTCKtAQFabtqYimkVogGAVItAFPUUWAkSp0qJBU6ClygSpU6VEgqZBVKIEqVMlRoKmUVrFCJFqZaiUVMorVICRakWo1qRa0QDxUgpgp4qgHCpFqMVItMB608UxaeKAHinrTBT1pgSCnCminCgQ8U8UwU8UxDhThTRThTAcKUUgpRQA4UCgUCgBaKKKAHUUUUAFFFFABRRRQA2ilNJQAlIacaQ0ANNNNONIaAGGmmnmmmgBhpppxpDQAw0008000hkZppqQ0w0DIzTDUhphpARMKYwqVhTCKQELCmEVKRTGFICFhTGFSkUwipaAhYVEwqdhTGFQ0BXYVEy1YYVGy1PKBVdahdatsKiZaXKBUZaiZatMtRstKwFUrSbanZaaRUtAR4pcU7FFZSQxuKSnGkNZNDGGkNONNNKwDDTSKeabVpARkUmKkNJirSAaBT1FKBT1FVYBUFToKYoqdBTsA9BU6CmItToKtIQ5RUyimqKlUVokA5RUqimqKkUVaQhyinqKaoqQCqAcKeKaBTxTAUU9aaKetMB608U0U8UAKKkWmCpFpiHCniminimA4U4U0U8UCFFOFIKcKYCilFJTqAFFAopRQAUUUUAOooooAKKKKACiiigBDSUUUABpKKKAEppoooAaaaaKKAGmmmiigBDTTRRQMaaYaKKQxhppoopAMaozRRSAYaY1FFICNhUZoopAMNMaiikMYwqNhRRSERsKiYUUVIETLUTCiikBGwphFFFQxjCKQ0UVmxjTTTRRWYDTTTRRSGNNJRRVIAxQBRRTQDwKkUUUVYEqCp0FFFUgJ0FTIKKKtCJlFSqKKKtCJFFSAUUVSAkUU8CiimIeKcKKKYDxThRRTAkFOFFFMB4qRaKKBDxThRRTAeKcKKKYhwpwoooAcKWiigBaUUUUAFKKKKAFooooAKKKKAP/2Q=="
              />
            </picture>
            <div className="grid gap-2">
              <h1 className="text-lg font-semibold ">
                {flower?.title?.length <= 30
                  ? flower?.title
                  : flower?.title?.slice(0, 30) + "..."}
              </h1>
              <p className="text-sm text-gray-500 dark:text-white/60">
                {flower?.description?.slice(0, 65)}...
              </p>
              <div className="text-2xl font-semibold">৳{flower?.price}</div>
            </div>
            <div className="flex gap-4">
              <Link className="w-4/6" href={`/flower/${flower?.id}`}>
                <button className="text-base border-2 border-lime-800 py-2 px-4 rounded-md hover:bg-lime-800 hover:text-white transition ease-in-out duration-500 mt-4">
                  View Details
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
      <Pagination className="my-6">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              className={"cursor-pointer"}
              onClick={() => handleLoadFlowers(page - 1)}
            />
          </PaginationItem>
          {Array(Math.ceil(parseFloat(flowers?.count / 8)) || 1)
            ?.fill()
            ?.map((_, index) => index + 1)
            ?.map((num) => (
              <PaginationItem key={num}>
                <PaginationLink
                  onClick={() => handleLoadFlowers(num)}
                  isActive={num === page}
                  className={"cursor-pointer"}
                >
                  {num}
                </PaginationLink>
              </PaginationItem>
            ))}
          <PaginationItem>
            <PaginationNext
              className={"cursor-pointer"}
              onClick={() => handleLoadFlowers(page + 1)}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
