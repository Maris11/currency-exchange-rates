<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Rate;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;

class RateController extends Controller
{
    public function fetch(Request $request, $currency)
    {
        $rates = Rate::where('currency', $currency)
            ->paginate(10);

        if (!sizeof($rates)) {
            return response('404: Currency not found',Response::HTTP_NOT_FOUND);
        }

        $aggregates = Rate::where('currency', $currency)
            ->select(
                DB::raw('MIN(rate) as min_rate'),
                DB::raw('MAX(rate) as max_rate'),
                DB::raw('AVG(rate) as avg_rate'),
                DB::raw('MAX(created_at) as last_update')
            )
            ->first();

        $minRate = $aggregates->min_rate;
        $maxRate = $aggregates->max_rate;
        $avgRate = $aggregates->avg_rate;
        $lastUpdate = $aggregates->last_update;

        return response(compact('rates', 'minRate', 'maxRate', 'avgRate', 'lastUpdate'));
    }
}
