<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Rate;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class RateController extends Controller
{
    public function fetch(Request $request, $currency)
    {
        $rates = Rate::where('currency', $currency)->get();

        if (!sizeof($rates)) {
            return response('Currency not found',Response::HTTP_NOT_FOUND);
        }

        return response(compact('rates'));
    }
}
